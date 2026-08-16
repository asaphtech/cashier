import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';

class DatabaseHelper {
  static final DatabaseHelper instance = DatabaseHelper._init();
  static Database? _database;

  DatabaseHelper._init();

  Future<Database> get database async {
    if (_database != null) return _database!;
    _database = await _initDB('kopitabo_pos.db');
    return _database!;
  }

  Future<Database> _initDB(String filePath) async {
    final dbPath = await getDatabasesPath();
    final path = join(dbPath, filePath);

    return await openDatabase(
      path,
      version: 1,
      onCreate: _createDB,
    );
  }

  Future _createDB(Database db, int version) async {
    // Local Product Catalog Cache
    await db.execute('''
      CREATE TABLE products (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        categoryId TEXT
      )
    ''');

    // Offline Orders Queue
    await db.execute('''
      CREATE TABLE orders (
        local_id TEXT PRIMARY KEY,
        total_amount REAL NOT NULL,
        status TEXT NOT NULL,
        sync_status TEXT NOT NULL, -- 'PENDING', 'SYNCED'
        created_at TEXT NOT NULL
      )
    ''');

    await db.execute('''
      CREATE TABLE order_items (
        id TEXT PRIMARY KEY,
        order_local_id TEXT NOT NULL,
        product_id TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        price REAL NOT NULL
      )
    ''');
  }

  // Example: Insert an order locally when offline
  Future<void> insertOfflineOrder(Map<String, dynamic> order) async {
    final db = await instance.database;
    await db.insert('orders', order);
  }

  // Example: Retrieve pending orders to sync
  Future<List<Map<String, dynamic>>> getPendingOrders() async {
    final db = await instance.database;
    return await db.query('orders', where: 'sync_status = ?', whereArgs: ['PENDING']);
  }
}
