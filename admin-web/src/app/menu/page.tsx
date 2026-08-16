import { fetchProducts } from "@/lib/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default async function MenuPage() {
  const products = await fetchProducts();

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Menu Management</h2>
          <p className="text-muted-foreground mt-1">Manage your cafe's products and prices here.</p>
        </div>
        <Button className="bg-amber-500 hover:bg-amber-600 text-white">
          + Add New Menu
        </Button>
      </div>

      <div className="border rounded-md bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Menu Name</TableHead>
              <TableHead>Category ID</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product: any) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>
                  <span className="bg-slate-100 text-slate-800 px-2 py-1 rounded-full text-xs font-semibold">
                    {product.categoryId}
                  </span>
                </TableCell>
                <TableCell>
                  Rp {new Intl.NumberFormat('id-ID').format(product.price)}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="destructive" size="sm">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
