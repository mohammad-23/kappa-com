# KappaCom

A Front-end project for an ecommerce web application.
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

---

## Getting Started

### Install

    $ git clone https://github.com/[repo-owner-name]/kappa-com.git
    $ cd kappa-com
    $ npm install

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

---

## Adding SSR/SSG on Pages

Export function `getServerSideProps` from a _page_ to add server side rendering. This function gets called on every page render.

```bash
   export async function getServerSideProps(context) {
       const response = await api.get(URL);

       return {
           // will be passed to the page component as props
           props: {
               data: response.data
           },
       }
   }
```

Export function `getStaticProps` from a _page_ to fetch data at build time. Next.js will pre-render this page at build time using the props returned by `getStaticProps`.

```bash
   export async function getStaticProps(context) {
       const response = await api.get(URL);

       return {
           // will be passed to the page component as props
           props: {
               data: response.data
           },
       }
   }
```

### https://nextjs.org/docs/basic-features/data-fetching

---

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

---

## MVP Requirements

- A navigation menu (on the right side of the homepage).
- List of categories of products which are fetched from API.
- A carousel or a banner displaying an image of a shopper shopping from a website.
- Show Login/Signup popup to the user when they land on the site for the first time.
- Login/Signup modal which lets users register/login onto the platform using mobile number, email, or social login (Google).
- A search bar on top of the homepage (or navbar). Place the search bar either at the top so it is clearly visible.
- Allow users to browse items by categories.
- A product details page that lets the user view the details of a product.
- Users should be able to select Size, Quantity and other parameters(if any) before adding items to the cart.
- Users should be able to add and remove items from the cart.
- Only logged in users should be able to add items to the cart (or checkout?)
- Websites should be mobile responsive. Users should be able to browse/purchase items on their mobile browser.
- Users should be able to see their order history.
- Users should be able to set their default shipping address.

---

## Application Views/Pages

- Homepage
- A login/signup view
- Product Listing Page
- Product Details Page
- Cart Page
- Wishlist Page
- Check-out page
- Thank you page
- Failure page
- Order history page
- Payment View
