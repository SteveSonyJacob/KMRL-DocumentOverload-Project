import { DocumentCard } from "@/components/DocumentCard";

// Mock data for demonstration
const mockDocuments = [
  {
    id: "1",
    title: "Monthly Safety Inspection Report",
    titleMalayalam: "മാസിക സുരക്ഷാ പരിശോധന റിപ്പോർട്ട്",
    summary: "Comprehensive safety audit for all metro stations completed. No major violations found.",
    summaryMalayalam: "എല്ലാ മെട്രോ സ്റ്റേഷനുകളുടെയും സമഗ്ര സുരക്ഷാ ഓഡിറ്റ് പൂർത്തിയായി. വലിയ ലംഘനങ്ങൾ കണ്ടെത്തിയില്ല.",
    department: "engineering",
    type: "safety-bulletin",
    priority: "normal",
    date: "2024-01-15",
    tags: ["Safety", "Inspection", "Monthly Report"],
  },
  {
    id: "2", 
    title: "Vendor Payment Authorization",
    titleMalayalam: "വെണ്ടർ പേയ്മെന്റ് അംഗീകാരം",
    summary: "Payment authorization for electrical maintenance services - ₹2,45,000",
    summaryMalayalam: "ഇലക്ട്രിക്കൽ മെയിന്റനൻസ് സേവനങ്ങൾക്കുള്ള പേയ്മെന്റ് അംഗീകാരം - ₹2,45,000",
    department: "procurement",
    type: "vendor-invoice",
    priority: "urgent",
    date: "2024-01-14",
    tags: ["Payment", "Vendor", "Electrical"],
  },
  {
    id: "3",
    title: "Employee Training Schedule",
    titleMalayalam: "ജീവനക്കാരുടെ പരിശീലന പട്ടിക",
    summary: "Q1 2024 training schedule for station operators and maintenance staff.",
    summaryMalayalam: "സ്റ്റേഷൻ ഓപ്പറേറ്റർമാർക്കും മെയിന്റനൻസ് സ്റ്റാഫിനുമുള്ള Q1 2024 പരിശീലന പട്ടിക.",
    department: "hr",
    type: "compliance",
    priority: "low",
    date: "2024-01-13",
    tags: ["Training", "HR", "Q1 2024"],
  },
  {
    id: "4",
    title: "Emergency Response Protocol Update",
    titleMalayalam: "അടിയന്തിര പ്രതികരണ പ്രോട്ടോക്കോൾ അപ്ഡേറ്റ്",
    summary: "Updated emergency procedures for fire safety and evacuation protocols.",
    summaryMalayalam: "ഫയർ സേഫ്റ്റിക്കും ഒഴിപ്പിക്കൽ പ്രോട്ടോക്കോളുകൾക്കുമുള്ള അപ്ഡേറ്റ് ചെയ്ത അടിയന്തിര നടപടികൾ.",
    department: "operations",
    type: "safety-bulletin",
    priority: "urgent",
    date: "2024-01-12",
    tags: ["Emergency", "Fire Safety", "Protocol"],
  },
  {
    id: "5",
    title: "Legal Compliance Audit",
    titleMalayalam: "നിയമപരമായ പാലന ഓഡിറ്റ്",
    summary: "Annual legal compliance review for regulatory requirements completed.",
    summaryMalayalam: "നിയന്ത്രണ ആവശ്യകതകൾക്കുള്ള വാർഷിക നിയമപരമായ പാലന അവലോകനം പൂർത്തിയായി.",
    department: "legal",
    type: "compliance",
    priority: "normal",
    date: "2024-01-11",
    tags: ["Legal", "Compliance", "Annual"],
  },
  {
    id: "6",
    title: "Budget Allocation Q1 2024",
    titleMalayalam: "ബജറ്റ് വിഹിതം Q1 2024",
    summary: "First quarter budget allocation across all departments approved.",
    summaryMalayalam: "എല്ലാ വകുപ്പുകളിലുടനീളമുള്ള ആദ്യ പാദ ബജറ്റ് വിഹിതം അംഗീകരിച്ചു.",
    department: "finance",
    type: "compliance",
    priority: "normal",
    date: "2024-01-10",
    tags: ["Budget", "Q1", "Allocation"],
  },
];

interface DocumentGridProps {
  department: string;
  searchQuery: string;
}

export const DocumentGrid = ({ department, searchQuery }: DocumentGridProps) => {
  // Filter documents based on department and search query
  const filteredDocuments = mockDocuments.filter((doc) => {
    const matchesDepartment = department === "all" || doc.department === department;
    const matchesSearch = 
      searchQuery === "" ||
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesDepartment && matchesSearch;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">
          Document Summary ({filteredDocuments.length})
        </h2>
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredDocuments.map((document) => (
          <DocumentCard key={document.id} document={document} />
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No documents match your current filters.</p>
        </div>
      )}
    </div>
  );
};