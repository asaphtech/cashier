"use client";

import { Button } from "@/components/ui/button";
import { Download, FileText, Sheet, Table as TableIcon } from "lucide-react";
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface ExportButtonsProps {
  data: any[];
}

export function ExportButtons({ data }: ExportButtonsProps) {
  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Orders");
    XLSX.writeFile(wb, "KopiTabo_Orders.xlsx");
  };

  const handleExportCSV = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const csv = XLSX.utils.sheet_to_csv(ws);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "KopiTabo_Orders_GoogleSheets.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Laporan Transaksi Kopi Tabo", 14, 15);
    
    const tableColumn = ["Order ID", "Total Amount", "Status", "Date"];
    const tableRows: any[] = [];

    data.forEach(order => {
      const orderData = [
        order.id.substring(0, 8),
        `Rp ${new Intl.NumberFormat('id-ID').format(order.totalAmount)}`,
        order.status,
        new Date(order.createdAt).toLocaleDateString()
      ];
      tableRows.push(orderData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("KopiTabo_Orders.pdf");
  };

  return (
    <div className="flex flex-wrap gap-3">
      <Button onClick={handleExportPDF} variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200">
        <FileText className="mr-2 h-4 w-4" /> Export PDF
      </Button>
      <Button onClick={handleExportExcel} variant="outline" className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 border-emerald-200">
        <TableIcon className="mr-2 h-4 w-4" /> Export Excel
      </Button>
      <Button onClick={handleExportCSV} variant="outline" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-200">
        <Sheet className="mr-2 h-4 w-4" /> Google Sheet (CSV)
      </Button>
    </div>
  );
}
