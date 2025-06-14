
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  companyName: z.string().min(2, "اسم الشركة مطلوب"),
  contactName: z.string().min(2, "اسم الشخص المسؤول مطلوب"),
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  phone: z.string().min(10, "رقم الهاتف مطلوب"),
  productCategory: z.string().min(1, "فئة المنتج مطلوبة"),
  productDescription: z.string().min(10, "وصف المنتج مطلوب"),
  quantity: z.string().min(1, "الكمية مطلوبة"),
  additionalNotes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface QuoteRequestDialogProps {
  children: React.ReactNode;
}

const QuoteRequestDialog = ({ children }: QuoteRequestDialogProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      productCategory: "",
      productDescription: "",
      quantity: "",
      additionalNotes: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Quote request submitted:", data);
    toast({
      title: "تم إرسال طلب العرض بنجاح",
      description: "سيتم التواصل معك خلال 24 ساعة",
    });
    setOpen(false);
    form.reset();
  };

  const productCategories = [
    "المنتجات الاستهلاكية",
    "المنتجات الغذائية",
    "مواد البناء والتشطيب",
    "المنتجات الصناعية",
    "منتجات تقنية وذكية",
    "المنتجات الطبية والصحية",
    "منتجات التعبئة والتغليف",
    "الأثاث والمفروشات",
    "المنتجات المستدامة"
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800">طلب عرض أسعار</DialogTitle>
          <DialogDescription className="text-gray-600">
            املأ النموذج أدناه وسنقوم بالتواصل معك خلال 24 ساعة
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسم الشركة *</FormLabel>
                    <FormControl>
                      <Input placeholder="اسم شركتك" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="contactName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسم الشخص المسؤول *</FormLabel>
                    <FormControl>
                      <Input placeholder="اسمك الكامل" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>البريد الإلكتروني *</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>رقم الهاتف *</FormLabel>
                    <FormControl>
                      <Input placeholder="+966xxxxxxxxx" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="productCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>فئة المنتج *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر فئة المنتج" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {productCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="productDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>وصف المنتج *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="اكتب وصفاً تفصيلياً للمنتج المطلوب..."
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الكمية المطلوبة *</FormLabel>
                  <FormControl>
                    <Input placeholder="مثال: 1000 قطعة، 50 كرتون، إلخ..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="additionalNotes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ملاحظات إضافية</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="أي ملاحظات أو متطلبات خاصة..."
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setOpen(false)}
              >
                إلغاء
              </Button>
              <Button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700"
              >
                إرسال الطلب
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteRequestDialog;
