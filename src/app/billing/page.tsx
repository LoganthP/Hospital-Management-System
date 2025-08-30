
"use client";
import type { ReactNode } from 'react';
import { useState, useEffect, useMemo } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { FilePlus2, Receipt, Search, Edit, Trash2, Eye, IndianRupee } from 'lucide-react'; // Replaced DollarSign with IndianRupee
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';

// Consistent Sample Data
const samplePatients = [
  { id: 'P001', name: 'Alice Wonderland' },
  { id: 'P002', name: 'Bob The Builder' },
  { id: 'P003', name: 'Charlie Brown' },
  { id: 'P004', name: 'Diana Prince' },
  { id: 'P005', name: 'Eva Green' },
  { id: 'P006', name: 'Frank Castle' },
];

const invoiceFormSchema = z.object({
  id: z.string().optional(),
  patientName: z.string().min(1, "Patient name is required."),
  amount: z.coerce.number().positive("Amount must be positive."),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date format" }),
  status: z.enum(["Paid", "Pending", "Overdue"], { required_error: "Status is required." }),
  items: z.string().min(5, "Invoice items description is required.").optional(),
});

type InvoiceFormValues = z.infer<typeof invoiceFormSchema>;

interface Invoice extends InvoiceFormValues {
  id: string;
}

const initialSampleInvoices: Invoice[] = [
  { id: 'INV001', patientName: 'Alice Wonderland', amount: 15000.00, date: '2024-05-10', status: 'Paid', items: 'Consultation Fee, Lab Tests' },
  { id: 'INV002', patientName: 'Bob The Builder', amount: 7550.50, date: '2024-05-15', status: 'Pending', items: 'Medication' },
  { id: 'INV003', patientName: 'Charlie Brown', amount: 22000.00, date: '2024-04-20', status: 'Paid', items: 'X-Ray, Consultation' },
  { id: 'INV004', patientName: 'Diana Prince', amount: 9999.00, date: '2024-05-01', status: 'Overdue', items: 'Emergency Room Visit' },
];

export default function BillingPage() {
  const [invoices, setInvoices] = useState<Invoice[]>(initialSampleInvoices);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const [viewingInvoice, setViewingInvoice] = useState<Invoice | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: { patientName: '', amount: 0, date: new Date().toISOString().split('T')[0], status: 'Pending', items: '' },
  });

  useEffect(() => {
    if(isFormOpen) {
      if (editingInvoice) {
        form.reset(editingInvoice);
      } else {
        form.reset({ patientName: '', amount: 0, date: new Date().toISOString().split('T')[0], status: 'Pending', items: '', id: undefined });
      }
    }
  }, [editingInvoice, form, isFormOpen]);

  const handleAddOrUpdateInvoice: SubmitHandler<InvoiceFormValues> = (data) => {
    if (editingInvoice) {
      setInvoices(invoices.map(inv => inv.id === editingInvoice.id ? { ...data, id: editingInvoice.id } as Invoice : inv));
    } else {
      const newInvoiceId = `INV${String(Date.now()).slice(-4)}${String(invoices.length + 1).padStart(3, '0')}`;
      setInvoices([...invoices, { ...data, id: newInvoiceId } as Invoice]);
    }
    setIsFormOpen(false);
    setEditingInvoice(null);
  };

  const handleDeleteInvoice = (invoiceId: string) => {
    setInvoices(invoices.filter(inv => inv.id !== invoiceId));
  };

  const openEditForm = (invoice: Invoice) => {
    setEditingInvoice(invoice);
    setIsFormOpen(true);
  };

  const openNewForm = () => {
    setEditingInvoice(null);
    setIsFormOpen(true);
  };

  const openViewDialog = (invoice: Invoice) => {
    setViewingInvoice(invoice);
    setIsViewDialogOpen(true);
  };

  const filteredInvoices = invoices.filter(invoice =>
    invoice.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const summaryStats = useMemo(() => {
    const totalOutstanding = invoices
      .filter(inv => inv.status === 'Pending' || inv.status === 'Overdue')
      .reduce((sum, inv) => sum + inv.amount, 0);
    
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const revenueThisMonth = invoices
      .filter(inv => inv.status === 'Paid' && new Date(inv.date).getMonth() === currentMonth && new Date(inv.date).getFullYear() === currentYear)
      .reduce((sum, inv) => sum + inv.amount, 0);
      
    const overdueInvoicesCount = invoices.filter(inv => inv.status === 'Overdue').length;
    
    return { totalOutstanding, revenueThisMonth, overdueInvoicesCount };
  }, [invoices]);

  return (
    <div className="space-y-8">
      <Dialog open={isFormOpen} onOpenChange={(isOpen) => { setIsFormOpen(isOpen); if(!isOpen) {setEditingInvoice(null); form.reset();} }}>
        <PageHeader
          title="Billing & Invoicing"
          description="Manage patient invoices, payments, and financial records."
          actions={
            <DialogTrigger asChild>
              <Button onClick={openNewForm} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Receipt className="mr-2 h-5 w-5" /> Create New Invoice
              </Button>
            </DialogTrigger>
          }
        />
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingInvoice ? 'Edit Invoice' : 'Create New Invoice'}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddOrUpdateInvoice)} className="space-y-4 py-4">
              <FormField
                control={form.control}
                name="patientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Patient Name</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value || ""}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Patient" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {samplePatients.map(p => <SelectItem key={p.id} value={p.name}>{p.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField control={form.control} name="amount" render={({ field }) => (
                <FormItem><FormLabel>Amount (₹)</FormLabel><FormControl><Input type="number" step="0.01" placeholder="10000.00" {...field} /></FormControl><FormMessage /></FormItem>
              )}/>
              <FormField control={form.control} name="date" render={({ field }) => (
                <FormItem><FormLabel>Invoice Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
              )}/>
              <FormField control={form.control} name="status" render={({ field }) => (
                <FormItem><FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value || "Pending"}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Paid">Paid</SelectItem>
                      <SelectItem value="Overdue">Overdue</SelectItem>
                    </SelectContent>
                  </Select><FormMessage />
                </FormItem>
              )}/>
              <FormField control={form.control} name="items" render={({ field }) => (
                <FormItem><FormLabel>Invoice Items</FormLabel><FormControl><Input placeholder="Consultation, Lab tests" {...field} /></FormControl><FormMessage /></FormItem>
              )}/>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => {setIsFormOpen(false); setEditingInvoice(null); form.reset();}}>Cancel</Button>
                <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">{editingInvoice ? 'Save Changes' : 'Create Invoice'}</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

       {/* View Invoice Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Invoice Details</DialogTitle>
            <DialogDescription>Viewing Invoice ID: {viewingInvoice?.id}</DialogDescription>
          </DialogHeader>
          {viewingInvoice && (
            <div className="space-y-3 py-4">
              <p><strong>Patient:</strong> {viewingInvoice.patientName}</p>
              <p><strong>Amount:</strong> ₹{viewingInvoice.amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              <p><strong>Date:</strong> {format(new Date(viewingInvoice.date), "PPP")}</p>
              <div><strong>Status:</strong> <Badge variant={
                  viewingInvoice.status === 'Paid' ? 'default' : 
                  viewingInvoice.status === 'Pending' ? 'secondary' : 
                  'destructive' 
                }
                className={
                  viewingInvoice.status === 'Paid' ? 'bg-green-600 hover:bg-green-600/90 text-white' : ''
                }
              >{viewingInvoice.status}</Badge></div>
              <p><strong>Items:</strong> {viewingInvoice.items || 'N/A'}</p>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <InfoCard title="Total Outstanding" value={`₹${summaryStats.totalOutstanding.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} icon={<IndianRupee className="h-6 w-6 text-destructive" />} />
        <InfoCard title="Revenue This Month" value={`₹${summaryStats.revenueThisMonth.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} icon={<IndianRupee className="h-6 w-6 text-green-600" />} />
        <InfoCard title="Overdue Invoices" value={String(summaryStats.overdueInvoicesCount)} icon={<FilePlus2 className="h-6 w-6 text-orange-500" />} />
      </div>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Invoice List</CardTitle>
          <CardDescription>Track and manage all patient invoices.</CardDescription>
          <div className="pt-4 relative">
             <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground mt-[8px]" />
            <Input 
              placeholder="Search invoices by ID or patient name..." 
              className="max-w-sm pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Patient Name</TableHead>
                <TableHead>Amount (₹)</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.length > 0 ? filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.patientName}</TableCell>
                  <TableCell>₹{invoice.amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                  <TableCell>{format(new Date(invoice.date), "yyyy-MM-dd")}</TableCell>
                  <TableCell>
                    <Badge variant={
                      invoice.status === 'Paid' ? 'default' : 
                      invoice.status === 'Pending' ? 'secondary' : 'destructive'
                    }
                    className={
                      invoice.status === 'Paid' ? 'bg-green-600 hover:bg-green-600/90 text-white' : '' 
                    }>
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="sm" onClick={() => openViewDialog(invoice)}>
                      <Eye className="mr-1 h-4 w-4" /> View
                    </Button>
                     <Button variant="outline" size="sm" onClick={() => openEditForm(invoice)}>
                      <Edit className="mr-1 h-4 w-4" /> Edit
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="mr-1 h-4 w-4" /> Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete invoice {invoice.id}.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteInvoice(invoice.id)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              )) : (
                 <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No invoices found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

interface InfoCardProps {
  title: string;
  value: string;
  icon: ReactNode;
}

function InfoCard({ title, value, icon }: InfoCardProps) {
  return (
    <Card className="shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
      </CardContent>
    </Card>
  );
}

