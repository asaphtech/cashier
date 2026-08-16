import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">Kopi Tabo</h1>
          <p className="text-sm text-gray-500">POS Admin</p>
        </div>
        <nav className="mt-6">
          <a href="#" className="block px-6 py-3 bg-gray-200 text-gray-700 font-semibold">Dashboard</a>
          <a href="#" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Catalog</a>
          <a href="#" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Inventory</a>
          <a href="#" className="block px-6 py-3 text-gray-600 hover:bg-gray-100">Reports</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Overview</h2>
          <Button>Export Report</Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Sales Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">Rp 4.500.000</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">124</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Top Product</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">Kopi Tabo Aren</div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders Table Skeleton */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-500 text-center py-8">
              Orders sync table will be displayed here
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
