import { BoxIcon } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { cn } from "~/lib/utils";

export interface ProductProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    salePrice: number;
    images: {
      id: string;
      originalName: string;
      name: string;
      type: string;
      size: number;
      url: string;
    }[];
    category: {
      id: string;
      name: string;
    };
    vendor: {
      id: string;
      name: string;
    };
  };
}

export const products = [
  {
    id: "1",
    name: "Product 1",
    description: "Product 1 description",
    price: 100,
    salePrice: 80,
    images: [
      {
        id: "1",
        originalName: "product-1.jpg",
        name: "product-1",
        type: "image/jpeg",
        size: 1024,
        url: "/images/product-1.jpg",
      },
    ],
    category: {
      id: "1",
      name: "Category 1",
    },
    vendor: {
      id: "1",
      name: "Vendor 1",
    },
  },
  {
    id: "2",
    name: "Product 2",
    description: "Product 2 description",
    price: 200,
    salePrice: 150,
    images: [
      {
        id: "2",
        originalName: "product-2.jpg",
        name: "product-2",
        type: "image/jpeg",
        size: 1024,
        url: "/images/product-2.jpg",
      },
    ],
    category: {
      id: "2",
      name: "Category 2",
    },
    vendor: {
      id: "2",
      name: "Vendor 2",
    },
  },
  {
    id: "3",
    name: "Product 3",
    description: "Product 3 description",
    price: 300,
    salePrice: 250,
    images: [
      {
        id: "3",
        originalName: "product-3.jpg",
        name: "product-3",
        type: "image/jpeg",
        size: 1024,
        url: "/images/product-3.jpg",
      },
    ],
    category: {
      id: "3",
      name: "Category 3",
    },
    vendor: {
      id: "3",
      name: "Vendor 3",
    },
  },
  {
    id: "4",
    name: "Product 4",
    description: "Product 4 description",
    price: 400,
    salePrice: 350,
    images: [
      {
        id: "4",
        originalName: "product-4.jpg",
        name: "product-4",
        type: "image/jpeg",
        size: 1024,
        url: "/images/product-4.jpg",
      },
    ],
    category: {
      id: "4",
      name: "Category 4",
    },
    vendor: {
      id: "4",
      name: "Vendor 4",
    },
  },
  {
    id: "5",
    name: "Product 5",
    description: "Product 5 description",
    price: 500,
    salePrice: 450,
    images: [
      {
        id: "5",
        originalName: "product-5.jpg",
        name: "product-5",
        type: "image/jpeg",
        size: 1024,
        url: "/images/product-5.jpg",
      },
    ],
    category: {
      id: "5",
      name: "Category 5",
    },
    vendor: {
      id: "5",
      name: "Vendor 5",
    },
  },
  {
    id: "6",
    name: "Product 6",
    description: "Product 6 description",
    price: 600,
    salePrice: 550,
    images: [
      {
        id: "6",
        originalName: "product-6.jpg",
        name: "product-6",
        type: "image/jpeg",
        size: 1024,
        url: "/images/product-6.jpg",
      },
    ],
    category: {
      id: "6",
      name: "Category 6",
    },
    vendor: {
      id: "6",
      name: "Vendor 6",
    },
  },
  {
    id: "7",
    name: "Product 7",
    description: "Product 7 description",
    price: 700,
    salePrice: 650,
    images: [
      {
        id: "7",
        originalName: "product-7.jpg",
        name: "product-7",
        type: "image/jpeg",
        size: 1024,
        url: "/images/product-7.jpg",
      },
    ],
    category: {
      id: "7",
      name: "Category 7",
    },
    vendor: {
      id: "7",
      name: "Vendor 7",
    },
  },
  {
    id: "8",
    name: "Product 8",
    description: "Product 8 description",
    price: 800,
    salePrice: 750,
    images: [
      {
        id: "8",
        originalName: "product-8.jpg",
        name: "product-8",
        type: "image/jpeg",
        size: 1024,
        url: "/images/product-8.jpg",
      },
    ],
    category: {
      id: "8",
      name: "Category 8",
    },
    vendor: {
      id: "8",
      name: "Vendor 8",
    },
  },
  {
    id: "9",
    name: "Product 9",
    description: "Product 9 description",
    price: 900,
    salePrice: 850,
    images: [
      {
        id: "9",
        originalName: "product-9.jpg",
        name: "product-9",
        type: "image/jpeg",
        size: 1024,
        url: "https://via.placeholder.com/1024x1024.png?text=Product+9+Image",
      },
    ],
    category: {
      id: "9",
      name: "Category 9",
    },
    vendor: {
      id: "9",
      name: "Vendor 9",
    },
  },
  {
    id: "10",
    name: "Product 10",
    description: "Product 10 description",
    price: 1000,
    salePrice: 950,
    images: [
      {
        id: "10",
        originalName: "product-10.jpg",
        name: "product-10",
        type: "image/jpeg",
        size: 1024,
        url: "https://via.placeholder.com/1024x1024.png?text=Product+10+Image",
      },
    ],
    category: {
      id: "10",
      name: "Category 10",
    },
    vendor: {
      id: "10",
      name: "Vendor 10",
    },
  },
];

export function Product({ product }: Readonly<ProductProps>) {
  return (
    <Card>
      <CardHeader className={cn("relative")}>
        {product.salePrice && (
          <span
            className={cn(
              "absolute top-0 left-0 rounded-tl-sm rounded-br-sm py-2 px-6 bg-gradient-to-r from-sky-600 to-sky-500 text-primary-foreground text-sm",
            )}
          >
            Sale
          </span>
        )}
        {product.images[0].url ? (
          <img
            src={product.images[0].url}
            alt={product.images[0].name}
            className={cn("size-56 object-cover")}
          />
        ) : (
          <BoxIcon strokeWidth={0.5} className={cn("h-full w-full")} />
        )}
      </CardHeader>
      <CardContent>
        <CardTitle className={cn("font-medium")}>{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardContent>
      <CardFooter className={cn("flex justify-between items-center")}>
        <p className={cn("flex gap-1 items-baseline")}>
          {product.salePrice && (
            <span className={cn("text-sm line-through")}>${product.price}</span>
          )}
          <span className={cn("text-primary text-xl font-medium")}>
            ${product.salePrice || product.price}
          </span>
        </p>
        <Button size="sm" className={cn("")}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
