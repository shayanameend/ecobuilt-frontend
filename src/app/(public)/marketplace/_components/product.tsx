import type { ProductType } from "~/../types";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { cn } from "~/lib/utils";

export interface ProductProps {
  product: ProductType;
}

export const vendors = [
  {
    id: "1",
    name: "Vendor 1",
  },
  {
    id: "2",
    name: "Vendor 2",
  },
  {
    id: "3",
    name: "Vendor 3",
  },
  {
    id: "4",
    name: "Vendor 4",
  },
  {
    id: "5",
    name: "Vendor 5",
  },
  {
    id: "6",
    name: "Vendor 6",
  },
  {
    id: "7",
    name: "Vendor 7",
  },
  {
    id: "8",
    name: "Vendor 8",
  },
  {
    id: "9",
    name: "Vendor 9",
  },
  {
    id: "10",
    name: "Vendor 10",
  },
];

export function Product({ product }: Readonly<ProductProps>) {
  return (
    <Card className={cn("relative")}>
      {product.salePrice && (
        <span
          className={cn(
            "absolute top-0 left-0 rounded-tl-sm rounded-br-sm py-2 px-6 bg-gradient-to-r from-sky-600 to-sky-500 text-primary-foreground text-sm",
          )}
        >
          Sale
        </span>
      )}
      <CardHeader className={cn("p-0")}>
        <img
          src={`${process.env.NEXT_PUBLIC_FILE_PREFIX}/${product.pictureIds[0]}`}
          alt={product.name}
          className={cn("h-56 object-cover rounded-t-md")}
        />
      </CardHeader>
      <CardContent className={cn("pt-6 pb-3")}>
        <CardTitle className={cn("font-medium")}>{product.name}</CardTitle>
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
