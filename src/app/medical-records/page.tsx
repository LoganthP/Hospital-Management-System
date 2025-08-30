
"use client";
import type { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { FilePlus, Search, Eye, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Consistent Sample Data (can be imported from a shared location in a larger app)
const samplePatients = [
  { id: 'P001', name: 'Alice Wonderland' },
  { id: 'P002', name: 'Bob The Builder' },
  { id: 'P003', name: 'Charlie Brown' },
  { id: 'P004', name: 'Diana Prince' },
];
const sampleDoctors = [
  { id: 'D001', name: 'Dr. Emily Carter', specialization: 'Cardiology' },
  { id: 'D002', name: 'Dr. John Smith', specialization: 'Pediatrics' },
  { id: 'D003', name: 'Dr. Sarah Lee', specialization: 'Neurology' },
  { id: 'D004', name: 'Dr. Michael Brown', specialization: 'Orthopedics' },
];

const recordFormSchema = z.object({
  id: z.string().optional(),
  patientName: z.string().min(1, "Patient name is required."), // Changed from min(2) to allow selection
  doctorName: z.string().min(1, "Doctor name is required."),   // Changed from min(2) to allow selection
  date: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date format" }),
  type: z.string().min(2, "Record type is required."),
  details: z.string().min(10, "Details must be at least 10 characters.").optional(),
});

type RecordFormValues = z.infer<typeof recordFormSchema>;

interface MedicalRecord extends RecordFormValues {
  id: string;
}

const initialSampleRecords: MedicalRecord[] = [
  { id: 'REC001', patientName: 'Alice Wonderland', doctorName: 'Dr. Emily Carter', date: '2024-03-15', type: 'Consultation Note', details: 'Patient reported mild fever and cough. Prescribed rest and hydration.' },
  { id: 'REC002', patientName: 'Bob The Builder', doctorName: 'Dr. John Smith', date: '2024-03-20', type: 'Lab Report', details: 'Blood sugar levels normal. Cholesterol slightly elevated.' },
  { id: 'REC003', patientName: 'Alice Wonderland', doctorName: 'Dr. Emily Carter', date: '2024-04-01', type: 'Prescription', details: 'Amoxicillin 250mg, 3 times a day for 7 days.' },
];

export default function MedicalRecordsPage() {
  const [records, setRecords] = useState<MedicalRecord[]>(initialSampleRecords);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchDate, setSearchDate] = useState('');
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<MedicalRecord | null>(null);
  const [viewingRecord, setViewingRecord] = useState<MedicalRecord | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const form = useForm<RecordFormValues>({
    resolver: zodResolver(recordFormSchema),
    defaultValues: { patientName: '', doctorName: '', date: new Date().toISOString().split('T')[0], type: '', details: '' },
  });

 useEffect(() => {
    if (isFormOpen) {
      if (editingRecord) {
        form.reset(editingRecord);
      } else {
        form.reset({ patientName: '', doctorName: '', date: new Date().toISOString().split('T')[0], type: '', details: '', id: undefined });
      }
    }
  }, [editingRecord, form, isFormOpen]);

  const handleAddOrUpdateRecord: SubmitHandler<RecordFormValues> = (data) => {
    if (editingRecord) {
      setRecords(records.map(r => r.id === editingRecord.id ? { ...data, id: editingRecord.id } as MedicalRecord : r));
    } else {
      const newRecordId = `REC${String(Date.now()).slice(-4)}${String(records.length + 1).padStart(3, '0')}`;
      setRecords([...records, { ...data, id: newRecordId } as MedicalRecord]);
    }
    setIsFormOpen(false);
    setEditingRecord(null);
  };

  const handleDeleteRecord = (recordId: string) => {
    setRecords(records.filter(r => r.id !== recordId));
  };

  const openEditForm = (record: MedicalRecord) => {
    setEditingRecord(record);
    setIsFormOpen(true);
  };

  const openNewForm = () => {
    setEditingRecord(null);
     // useEffect will handle resetting the form with default values
    setIsFormOpen(true);
  };
  
  const openViewDialog = (record: MedicalRecord) => {
    setViewingRecord(record);
    setIsViewDialogOpen(true);
  };

  const filteredRecords = records.filter(record => {
    const termMatch = record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      record.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      record.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      record.type.toLowerCase().includes(searchTerm.toLowerCase());
    const dateMatch = searchDate ? record.date === searchDate : true;
    return termMatch && dateMatch;
  });

  return (
    <div className="space-y-8">
      <Dialog open={isFormOpen} onOpenChange={(isOpen) => { setIsFormOpen(isOpen); if (!isOpen) { setEditingRecord(null); form.reset(); } }}>
        <PageHeader
          title="Medical Records"
          description="Access and manage patient medical history and documents."
          actions={
             <DialogTrigger asChild>
              <Button onClick={openNewForm} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <FilePlus className="mr-2 h-5 w-5" /> Add New Record
              </Button>
            </DialogTrigger>
          }
        />
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingRecord ? 'Edit Medical Record' : 'Add New Medical Record'}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddOrUpdateRecord)} className="space-y-4 py-4">
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
              <FormField
                control={form.control}
                name="doctorName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Doctor Name</FormLabel>
                     <Select onValueChange={field.onChange} value={field.value || ""}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Doctor" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {sampleDoctors.map(d => <SelectItem key={d.id} value={d.name}>{d.name} ({d.specialization})</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField control={form.control} name="date" render={({ field }) => (
                <FormItem><FormLabel>Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
              )}/>
              <FormField control={form.control} name="type" render={({ field }) => (
                <FormItem><FormLabel>Record Type</FormLabel><FormControl><Input placeholder="Consultation Note, Lab Report, etc." {...field} /></FormControl><FormMessage /></FormItem>
              )}/>
              <FormField control={form.control} name="details" render={({ field }) => (
                <FormItem><FormLabel>Details</FormLabel><FormControl><Textarea placeholder="Detailed notes about the record..." {...field} rows={4} /></FormControl><FormMessage /></FormItem>
              )}/>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => {setIsFormOpen(false); setEditingRecord(null); form.reset();}}>Cancel</Button>
                <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">{editingRecord ? 'Save Changes' : 'Add Record'}</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* View Record Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Medical Record Details</DialogTitle>
            <DialogDescription>Viewing record ID: {viewingRecord?.id}</DialogDescription>
          </DialogHeader>
          {viewingRecord && (
            <div className="space-y-4 py-4">
              <p><strong>Patient:</strong> {viewingRecord.patientName}</p>
              <p><strong>Doctor:</strong> {viewingRecord.doctorName}</p>
              <p><strong>Date:</strong> {viewingRecord.date}</p>
              <p><strong>Type:</strong> {viewingRecord.type}</p>
              <p><strong>Details:</strong></p>
              <Textarea value={viewingRecord.details || ''} readOnly rows={6} className="bg-muted/50"/>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Search Medical Records</CardTitle>
          <CardDescription>Find records by patient name, record ID, or date.</CardDescription>
          <div className="pt-4 flex flex-wrap gap-2">
            <div className="relative flex-grow sm:flex-grow-0 sm:max-w-sm">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Patient, Doctor, ID, Type..." 
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Input 
              type="date" 
              className="max-w-xs"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
            />
            <Button variant="outline" onClick={() => {setSearchTerm(''); setSearchDate('');}}>Clear Search</Button>
          </div>
        </CardHeader>
        <CardContent>
           <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Record ID</TableHead>
                <TableHead>Patient Name</TableHead>
                <TableHead>Doctor Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Record Type</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.length > 0 ? filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.id}</TableCell>
                  <TableCell>{record.patientName}</TableCell>
                  <TableCell>{record.doctorName}</TableCell>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>{record.type}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="sm" onClick={() => openViewDialog(record)}>
                      <Eye className="mr-1 h-4 w-4" /> View
                    </Button>
                     <Button variant="outline" size="sm" onClick={() => openEditForm(record)}>
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
                            This will permanently delete medical record {record.id}.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteRecord(record.id)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                    No records found.
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
