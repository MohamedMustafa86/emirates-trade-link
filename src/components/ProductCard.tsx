
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Package } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  supplier: string;
  origin: string;
  category: string;
  rating: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow" dir="rtl">
      <CardContent className="p-0">
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-800 mb-2">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 ml-1" />
              <span className="text-sm text-gray-600">{product.rating}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 text-blue-600 ml-1" />
              <span className="text-sm text-gray-600">{product.origin}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <span className="text-green-600 font-bold text-lg">${product.price}</span>
            <div className="flex items-center">
              <Package className="h-4 w-4 text-gray-500 ml-1" />
              <span className="text-sm text-gray-500">{product.supplier}</span>
            </div>
          </div>

          <Button className="w-full bg-green-600 hover:bg-green-700">
            عرض التفاصيل
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
