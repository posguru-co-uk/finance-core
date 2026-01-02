# Changelog

**Breaking**, **New**, **Fix**, **Change**, **Others**

## 2.1.1 (2026-01-02)
- **FIX** [POSWEB-1652](https://posguru.atlassian.net/browse/POSWEB-1658) Fix attribute naming for address fields in DriverProfileAttributes

## 2.1.0 (2026-01-02)
- **New** [POSWEB-1652](https://posguru.atlassian.net/browse/POSWEB-1652) Create Driver Partner
## 2.0.0 (2025-12-31)
- **New** [POSWEB-1656](https://posguru.atlassian.net/browse/POSWEB-1656) checkout discount
- **New** [POSWEB-1656](https://posguru.atlassian.net/browse/POSWEB-1656) checkout discount
- **FIX** [POSWEB-1649](https://posguru.atlassian.net/browse/POSWEB-1649) service type based price change
- **FIX** [POSWEB-1591](https://posguru.atlassian.net/browse/POSWEB-1619) Update the staff model in finance core
  - fix: update staff model to remove password property and enforce hourly rate validation
  - **FIX** [POSWEB-1591](https://posguru.atlassian.net/browse/POSWEB-1602) Add IS_DELETED attribute to StaffProfileAttributes and update permissions format
  - Add IS_DELETED attribute to StaffProfileAttributes and update permissions format
**Breaking** [POSWEB-1598](https://posguru.atlassian.net/browse/POSWEB-1598) Remove price calculation fetching from products
- remove price calculation fetching from products
- **FIX** [POSWEB-1591](https://posguru.atlassian.net/browse/POSWEB-1597) Add STAFF partner type and      integrate StaffProfileAttributes
  - Add STAFF partner type and integrate StaffProfileAttributes
- **FIX** [POSWEB-1591](https://posguru.atlassian.net/browse/POSWEB-1597) Add STAFF partner type and      integrate StaffProfileAttributes
  - Add STAFF partner type and integrate StaffProfileAttributes
- **New** [POSWEB-1591](https://posguru.atlassian.net/browse/POSWEB-1591) with staff
  - with staff
- **New** [POSWEB-1523](https://posguru.atlassian.net/browse/POSWEB-1523) with partner
  - with partner
- **New** [POSWEB-1523](https://posguru.atlassian.net/browse/POSWEB-1523) apply totalAmount
  - apply totalAmount calculation to order
- **Fix** [POSWEB-1503](https://posguru.atlassian.net/browse/POSWEB-1521) fix discount calculation
  - fix discount calculation
- **New** [POSWEB-1503](https://posguru.atlassian.net/browse/POSWEB-1503) add latitude and longitude
  - added  latitude and longitude to partner and location
- **Fix** [POSWEB-1451](https://posguru.atlassian.net/browse/POSWEB-1451) apply service charge to order
  - apply delivery charge
- **Fix** [POSWEB-1451](https://posguru.atlassian.net/browse/POSWEB-1451) apply service charge to order
  - apply service charge to order
- **Fix** [POSWEB-1373](https://posguru.atlassian.net/browse/POSWEB-1373) Apply discount to posguru core
  - applied totalDiscount
- **Fix** [POSWEB-1373](https://posguru.atlassian.net/browse/POSWEB-1373) Apply discount to posguru core
  - updated carrybag fee to order
- **Fix** [POSWEB-1373](https://posguru.atlassian.net/browse/POSWEB-1373) Apply discount to posguru core
  - added discount amount
- **Fix** [POSWEB-1379](https://posguru.atlassian.net/browse/POSWEB-1379) add location attributes to finance core
- **Fix** [POSWEB-1373](https://posguru.atlassian.net/browse/POSWEB-1373) Apply discount to posguru core
  - fixed discount calculation 
- **New** [POSWEB-1373](https://posguru.atlassian.net/browse/POSWEB-1373) Apply discount to posguru core
  - added START_TOKEN_NUMBER
- **New** [POSWEB-1281](https://posguru.atlassian.net/browse/POSWEB-1281) Add subTotal
  - added subtotal to finace core
## 1.0.0 (2025-11-18)
- **New** [POSWEB-1210](https://posguru.atlassian.net/browse/POSWEB-1210) Add calculation for invoice
  - Add types of `Order`, `OrderItem` and `OrderItemsAddons`
  - Created method `applyInvoice` it will calculate order related.

