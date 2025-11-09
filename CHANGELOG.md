# Changelog

**Breaking**, **New**, **Fix**, **Change**, **Others**

## 1.0.0-alpha15 (2025-11-10)
- **Fix** [POSWEB-1451](https://posguru.atlassian.net/browse/POSWEB-1451) apply service charge to order
  - apply delivery charge

## 1.0.0-alpha14 (2025-10-27)
- **Fix** [POSWEB-1451](https://posguru.atlassian.net/browse/POSWEB-1451) apply service charge to order
  - apply service charge to order
  
## 1.0.0-alpha13 (2025-10-27)
- **Fix** [POSWEB-1373](https://posguru.atlassian.net/browse/POSWEB-1373) Apply discount to posguru core
  - applied totalDiscount

## 1.0.0-alpha12 (2025-10-27)
- **Fix** [POSWEB-1373](https://posguru.atlassian.net/browse/POSWEB-1373) Apply discount to posguru core
  - updated carrybag fee to order

## 1.0.0-alpha11 (2025-10-22)
- **Fix** [POSWEB-1373](https://posguru.atlassian.net/browse/POSWEB-1373) Apply discount to posguru core
  - added discount amount

## 1.0.0-alpha10 (2025-10-21)
- **Fix** [POSWEB-1379](https://posguru.atlassian.net/browse/POSWEB-1379) add location attributes to finance core

## 1.0.0-alpha9 (2025-10-18)
- **Fix** [POSWEB-1373](https://posguru.atlassian.net/browse/POSWEB-1373) Apply discount to posguru core
  - fixed discount calculation 

## 1.0.0-alpha7 (2025-10-18)
- **New** [POSWEB-1373](https://posguru.atlassian.net/browse/POSWEB-1373) Apply discount to posguru core
  - added START_TOKEN_NUMBER 

- **New** [POSWEB-1281](https://posguru.atlassian.net/browse/POSWEB-1281) Add subTotal
  - added subtotal to finace core

## 1.0.0 (2025-09-13)

- **New** [POSWEB-1210](https://posguru.atlassian.net/browse/POSWEB-1210) Add calculation for invoice
  - Add types of `Order`, `OrderItem` and `OrderItemsAddons`
  - Created method `applyInvoice` it will calculate order related.