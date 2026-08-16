# Kopi Tabo Cashier App

> **Note:** The Flutter SDK is not installed on this machine, so the project scaffolding could not be automatically generated.

## Setup Instructions

To initialize the Flutter POS application for Kopi Tabo, follow these steps on a machine with the Flutter SDK installed:

1. Run the following command in this directory (`c:\JOYKPS\Cashier`):
   ```bash
   flutter create cashier-app
   ```
2. Navigate into the folder:
   ```bash
   cd cashier-app
   ```
3. Add the necessary dependencies for local storage (SQLite) and Bluetooth printing:
   ```bash
   flutter pub add sqflite path_provider http shared_preferences esc_pos_bluetooth esc_pos_utils
   ```
4. Replace the `lib/main.dart` with your application UI.
5. Use the provided `database.dart` as a reference for setting up your local SQLite tables for offline-first support.

## Offline Sync Architecture
The POS app should:
1. Attempt to sync the order with the backend `POST /api/orders`.
2. If it fails (no internet), store it in SQLite via `sqflite` with `sync_status = 'PENDING'`.
3. A background timer or network connectivity listener should continuously retry uploading pending orders to the backend.
