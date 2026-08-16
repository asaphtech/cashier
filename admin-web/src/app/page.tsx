import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CreditCard, DollarSign, Users, ShoppingBag } from "lucide-react";
import { fetchProducts, fetchOrders } from "@/lib/api";
import { DashboardChart } from "@/components/DashboardChart";

export default async function Home() {
  const products = await fetchProducts();
  const orders = await fetchOrders();

  const totalRevenue = orders.reduce((sum: number, order: any) => sum + order.totalAmount, 0);
  const totalSales = orders.length;

  return (
    <div className="p-8 lg:p-10 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard Overview</h2>
          <p className="text-slate-500 mt-2">Welcome back, here's what's happening with Kopi Tabo today.</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-sm ring-1 ring-slate-100 bg-white hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-600">Total Revenue</CardTitle>
            <div className="bg-emerald-100 p-2 rounded-lg">
                <DollarSign className="h-4 w-4 text-emerald-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">Rp {new Intl.NumberFormat('id-ID').format(totalRevenue)}</div>
            <p className="text-xs text-emerald-600 font-medium mt-1 flex items-center">
              <span className="bg-emerald-100 px-1 rounded mr-2">Live</span> Updated today
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-sm ring-1 ring-slate-100 bg-white hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-600">Sales</CardTitle>
            <div className="bg-blue-100 p-2 rounded-lg">
                <CreditCard className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{totalSales}</div>
            <p className="text-xs text-blue-600 font-medium mt-1 flex items-center">
              <span className="bg-blue-100 px-1 rounded mr-2">Live</span> Orders completed
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm ring-1 ring-slate-100 bg-white hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-600">Active Menu</CardTitle>
            <div className="bg-amber-100 p-2 rounded-lg">
                <Activity className="h-4 w-4 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{products.length}</div>
            <p className="text-xs text-slate-500 font-medium mt-1">Successfully loaded</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm ring-1 ring-slate-100 bg-white hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-600">Customers</CardTitle>
            <div className="bg-purple-100 p-2 rounded-lg">
                <Users className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">{totalSales}</div>
            <p className="text-xs text-slate-500 font-medium mt-1">Total guests served</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-sm ring-1 ring-slate-100 bg-white hover:shadow-md transition-shadow">
        <CardHeader className="border-b border-slate-50 pb-4">
          <CardTitle className="text-lg font-semibold text-slate-900">Revenue Overview</CardTitle>
        </CardHeader>
        <CardContent className="p-6 pt-8">
            <DashboardChart />
        </CardContent>
      </Card>
      
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border-0 shadow-sm ring-1 ring-slate-100 bg-white flex flex-col hover:shadow-md transition-shadow">
          <CardHeader className="border-b border-slate-50 pb-4">
            <CardTitle className="text-lg font-semibold text-slate-900">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            {orders.length === 0 ? (
              <div className="h-full min-h-[250px] flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 m-6">
                <ShoppingBag className="h-10 w-10 text-slate-300 mb-3" />
                <p className="text-sm font-medium text-slate-600">No recent orders found</p>
                <p className="text-xs text-slate-400 mt-1">Test checkout on cashier app first!</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {orders.slice(0, 5).map((order: any) => (
                  <div key={order.id} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-100 p-2 rounded-lg">
                        <ShoppingBag className="h-4 w-4 text-slate-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{order.id.substring(0, 8)}</p>
                        <p className="text-xs text-slate-500">{new Date(order.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-900">Rp {new Intl.NumberFormat('id-ID').format(order.totalAmount)}</p>
                      <p className="text-xs text-emerald-600 font-medium">{order.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="col-span-3 border-0 shadow-sm ring-1 ring-slate-100 bg-white hover:shadow-md transition-shadow">
          <CardHeader className="border-b border-slate-50 pb-4">
            <CardTitle className="text-lg font-semibold text-slate-900">Top Products</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-full min-h-[250px] flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
               <p className="text-sm font-medium text-slate-500">Not enough data to show</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
