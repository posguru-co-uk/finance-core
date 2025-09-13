# POS Models & Invoice Utility

## Module Reference

### `models.ts`

- [`LocalizedText`](#localizedtext)  
- [`AddonItem`](#addonitem)  
- [`Addon`](#addon)  
- [`Product`](#product)  
- [`OrderItemsAddons`](#orderitemsaddons)  
- [`OrderItem`](#orderitem)  
- [`Order`](#order)  
- [`applyInvoice`](#applyinvoice)

---

### `LocalizedText`

**Type**
```ts
export interface LocalizedText {
  [langCode: string]: string;
}
```

**Description**  
Represents multilingual text for product and addon names.

---

### `AddonItem`

**Type**
```ts
export interface AddonItem {
  id: number;
  item: LocalizedText;
  rank: number;
  amount: number;
  defaultSelect: boolean;
}
```

**Description**  
Represents an individual addon option (e.g., extra cheese).

---

### `Addon`

**Type**
```ts
export interface Addon {
  id: number;
  name: LocalizedText;
  rank: number;
  status: 'ACTIVE' | 'INACTIVE' | string;
  maximum: number;
  minimum: number;
  addonItems: Record<string, AddonItem>;
}
```

**Description**  
Represents a group of addon items with selection limits.

---

### `Product`

**Type**
```ts
export interface Product {
  id: number;
  name: LocalizedText;
  allergens: string[];
  masterItemId: string | null;
  description: string;
  color: string;
  isSellOnTill: boolean;
  categoryId: string;
  costPrice: string;
  salesPriceWithoutTax: string;
  salesPrice: number;
  taxRateId: string;
  isDeleted: boolean;
  addonItems: Record<string, AddonItem>;
  addons: Record<string, Addon>;
}
```

**Description**  
Represents a product in the catalog (e.g., Pizza).

---

### `OrderItemsAddons`

**Type**
```ts
export interface OrderItemsAddons {
  name: LocalizedText;
  id: number;
  orderItemsId: number;
  addonItemId: number;
  amount: number;
  quantity: number;
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
  orderId: number;
  partnerId: string;
}
```

**Description**  
Represents an addon attached to a specific order item.

---

### `OrderItem`

**Type**
```ts
export interface OrderItem {
  id: number;
  name: LocalizedText;
  orderId: number;
  productId: number;
  amount: number;
  quantity: number;
  totalAmount: number;
  totalCost: number;
  costWithoutDiscount: number;
  addons: Array<OrderItemsAddons>;
}
```

**Description**  
Represents a purchased product within an order.

---

### `Order`

**Type**
```ts
export interface Order {
  id: number;
  locationId: string;
  billAmount: number;
  items: Array<OrderItem>;
}
```

**Description**  
Represents an order containing items, totals, and metadata.

---

### `applyInvoice`

**Signature**
```ts
function applyInvoice(
  order: Order,
  products: Record<string, Product>
): Order
```

**Description**  
Recalculates an order’s **bill amount** and ensures all item/addon totals are correct.

**Parameters**
| Name      | Type                        | Description                      |
| --------- | --------------------------- | -------------------------------- |
| `order`   | `Order`                     | The order object to recalculate  |
| `products`| `Record<string, Product>`   | Map of productId → Product model |

**Returns**
| Type   | Description                        |
| ------ | ---------------------------------- |
| `Order`| The updated order with recalculated totals |

**Example**
```ts
const updatedOrder = applyInvoice(order, products);
console.log(updatedOrder.billAmount); // recalculated total
```
