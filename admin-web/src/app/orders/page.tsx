import { ExportButtons } from "@/components/ExportButtons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ShoppingBag } from "lucide-react";

import { fetchOrders } from "@/lib/api";

export default async function OrdersPage() {
  const orders = await fetchOrders();

  return (
    <div className="p-8 lg:p-10 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Orders & Reports</h2>
          <p className="text-slate-500 mt-2">View transaction history and download reports.</p>
        </div>
        <ExportButtons data={orders} />
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-semibold text-slate-600 h-12">Order ID</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12">Date</TableHead>
              <TableHead className="font-semibold text-slate-600 h-12">Total Amount</TableHead>
              <TableHead className="text-right font-semibold text-slate-600 h-12 pr-6">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order: any) => (
              <TableRow key={order.id} className="group hover:bg-slate-50/50 transition-colors">
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-100 p-2 rounded-lg group-hover:bg-slate-200 transition-colors">
                        <ShoppingBag className="h-4 w-4 text-slate-600" />
                    </div>
                    <span className="font-mono text-sm font-semibold text-slate-700">{order.id}</span>
                  </div>
                </TableCell>
                <TableCell className="py-4 text-slate-600">
                    {new Date(order.createdAt).toLocaleString()}
                </TableCell>
                <TableCell className="font-medium text-slate-700 py-4">
                  Rp {new Intl.NumberFormat('id-ID').format(order.totalAmount)}
                </TableCell>
                <TableCell className="text-right py-4 pr-6">
                    <span className="bg-emerald-100 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold">
                        {order.status}
                    </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
