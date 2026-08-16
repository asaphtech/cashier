"use client";

import { useEffect, useState } from "react";
import { Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Mock Data
const initialOrders = [
  {
    id: "ORD-1234",
    time: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 mins ago
    status: "PENDING",
    type: "Dine In",
    table: "04",
    items: [
      { name: "Iced Caramel Macchiato", qty: 2, notes: "Less sugar, oat milk" },
      { name: "Espresso", qty: 1, notes: "" }
    ]
  },
  {
    id: "ORD-1235",
    time: new Date(Date.now() - 1000 * 60 * 12).toISOString(), // 12 mins ago
    status: "PENDING",
    type: "Takeaway",
    table: "-",
    items: [
      { name: "Americano", qty: 1, notes: "Extra hot" },
      { name: "Croissant", qty: 1, notes: "Warm it up" }
    ]
  },
  {
    id: "ORD-1236",
    time: new Date(Date.now() - 1000 * 60 * 1).toISOString(), // 1 min ago
    status: "PENDING",
    type: "Dine In",
    table: "12",
    items: [
      { name: "Matcha Latte", qty: 3, notes: "" }
    ]
  }
];

export default function KDSPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every minute to refresh order waiting times
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const completeOrder = (id: string) => {
    setOrders(orders.filter(o => o.id !== id));
  };

  const getWaitTime = (timeString: string) => {
    const diff = Math.floor((currentTime.getTime() - new Date(timeString).getTime()) / 60000);
    return diff;
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 flex flex-col">
      <header className="flex justify-between items-center mb-8 bg-slate-800 p-4 rounded-2xl shadow-lg border border-slate-700">
        <div>
          <h1 className="text-2xl font-bold text-amber-500 tracking-tight">Kopi Tabo KDS</h1>
          <p className="text-slate-400 text-sm font-medium mt-1">Kitchen Display System</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-slate-900/50 px-4 py-2 rounded-xl border border-slate-700">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-emerald-400 font-medium text-sm">System Online</span>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold tabular-nums tracking-tight">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
            <p className="text-slate-400 text-sm">
              {currentTime.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}
            </p>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-6 h-full items-start">
          {orders.map((order) => {
            const waitTime = getWaitTime(order.time);
            const isLate = waitTime > 10;
            const isWarning = waitTime > 5 && waitTime <= 10;

            return (
              <Card 
                key={order.id} 
                className={`flex-shrink-0 w-80 bg-slate-800 border-2 overflow-hidden flex flex-col shadow-xl ${
                  isLate ? 'border-red-500/50 shadow-red-900/20' : 
                  isWarning ? 'border-amber-500/50 shadow-amber-900/20' : 
                  'border-slate-700'
                }`}
              >
                {/* Header */}
                <div className={`p-4 border-b flex justify-between items-start ${
                  isLate ? 'bg-red-500/10 border-red-500/20' : 
                  isWarning ? 'bg-amber-500/10 border-amber-500/20' : 
                  'bg-slate-900/50 border-slate-700'
                }`}>
                  <div>
                    <h3 className="text-xl font-bold text-white">{order.id}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="bg-slate-700 text-slate-200 px-2 py-0.5 rounded text-xs font-semibold">
                        {order.type}
                      </span>
                      {order.table !== "-" && (
                        <span className="bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded text-xs font-semibold">
                          Table {order.table}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className={`flex items-center gap-1.5 font-bold tabular-nums px-2.5 py-1 rounded-lg ${
                    isLate ? 'bg-red-500 text-white' : 
                    isWarning ? 'bg-amber-500 text-slate-900' : 
                    'bg-slate-700 text-slate-300'
                  }`}>
                    <Clock size={16} />
                    {waitTime}m
                  </div>
                </div>

                {/* Body (Items) */}
                <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex gap-3 pb-3 border-b border-slate-700/50 last:border-0 last:pb-0">
                      <div className="font-bold text-lg text-amber-500 bg-slate-900 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">
                        {item.qty}x
                      </div>
                      <div>
                        <p className="font-semibold text-lg text-slate-200 leading-tight">
                          {item.name}
                        </p>
                        {item.notes && (
                          <div className="flex items-start gap-1.5 mt-1.5 text-sm text-red-400 font-medium bg-red-400/10 p-1.5 rounded border border-red-400/20">
                            <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
                            <span>{item.notes}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="p-4 bg-slate-900/50 border-t border-slate-700">
                  <Button 
                    onClick={() => completeOrder(order.id)}
                    className="w-full h-14 text-lg font-bold bg-emerald-500 hover:bg-emerald-600 text-white transition-colors"
                  >
                    <CheckCircle2 className="mr-2 h-6 w-6" /> MARK AS DONE
                  </Button>
                </div>
              </Card>
            );
          })}

          {orders.length === 0 && (
            <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 pt-20">
              <CheckCircle2 size={64} className="mb-4 text-emerald-500/50" />
              <p className="text-2xl font-bold">All caught up!</p>
              <p className="mt-2 text-slate-400">Waiting for new orders...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
