# Next.js Full Website

A modern, full-featured Next.js website with TypeScript, Tailwind CSS, and Radix UI components.

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm 9.x or later / yarn 1.22.x or later
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd next-full-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   Then edit the `.env.local` file with your configuration.

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🛠️ Built With

- [Next.js](https://nextjs.org/) - The React Framework for the Web
- [TypeScript](https://www.typescriptlang.org/) - Type-Safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components
- [shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components

## 🚀 Deployment

### Vercel (Recommended)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

1. Push your code to a GitHub, GitLab, or Bitbucket repository
2. Import your project on Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy!

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

## 📝 Environment Variables

Copy `env.example` to `.env.local` and update the variables:

```bash
cp env.example .env.local
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/docs)
