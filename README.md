# ViceForms - AI Form Builder

### ❤️ Support

If you find this project helpful, please consider giving this repository a ⭐️ on GitHub!
Built by Vice with ❤️

---

## 📌 Project Overview

Welcome to **ViceForms**! This project leverages cutting-edge tools and frameworks to create a dynamic and efficient form-building platform powered by AI. ViceForms provides a seamless drag-and-drop experience, empowering users to create forms effortlessly while collecting valuable insights.

---

## 🌟 Features

- 🔐 **Local User Management**
- ➕ **Create Forms**
- 🧠 **AI-Powered Form Generation**
- ✏️ **Edit Block Properties**
- 💾 **Save & Publish Forms**
- 🔗 **Share Form Links**
- 📊 **User Response Collection**
- 🌐 **Track User Analytics on Forms**
- 🌐 **Built with Next.js 14**
- 🎨 **Styled with TailwindCSS and Shadcn UI**
- 🚀 **Seamless Integration with Server Actions**
- 💾 **Neon PostgreSQL & Prisma ORM**
- 📤 **Deployed on Vercel**

---

## 🚀 Tools & Technologies

This project is built using:

- **Next.js 14**: Fast, SEO-friendly frontend framework.
- **Server Actions**: For seamless backend API integration.
- **Prisma ORM**: SQL ORM for efficient database management.
- **TailwindCSS**: For rapid, responsive styling.
- **Shadcn UI**: Modern, customizable UI components.
- **Neon PostgreSQL**: Scalable and reliable database solution.

---

## 🔄 How to Get Started

### 1. Watch The Video On Youtube

### 2. Set Up Environment Variables

Create a `.env` file in the root of your project and add the following:

```plaintext
# ViceForms Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database Configuration (Neon PostgreSQL)
DATABASE_URL=<your-neon-pooled-connection-string>
DIRECT_DATABASE_URL=<your-neon-direct-connection-string>

# Google Gemini AI API Key
NEXT_PUBLIC_GEMINI_API_KEY=<your-gemini-api-key>
```

### 3. Get Database URLs from Neon

1. **Log in to Neon**:

   - Navigate to [Neon](https://neon.tech) and log in to your account.

2. **Access Project Settings**:

   - Select your project and go to the **Settings** tab.

3. **Find URLs**:

   - **Direct Database URL**: Look under the connection settings for the URL labeled "Direct Connection". Copy and paste it into your `.env` file as `DIRECT_DATABASE_URL`.
   - **Pooler Database URL**: Look under the "Connection Pooler" section for the Pooler URL. Use this as `DATABASE_URL` in your `.env` file.

   > **Note:** If you encounter issues accessing your Neon database, refer to the troubleshooting guide in `_neon_database_help/database.md` for detailed steps.

### 5. Run the Development Server

Start the development server:

```bash
npm run dev
```

Access the application at `http://localhost:3000`.

---

## 🔄 Deploy to Vercel

### 1. Add Environment Variables on Vercel

## 🚀 Vercel Deployment

### 1. Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/viceforms)

### 2. Manual Deployment Steps

1. **Fork this repository** to your GitHub account
2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your forked repository

3. **Configure Environment Variables** in Vercel:
   ```
   NEXT_PUBLIC_APP_URL=https://your-app-name.vercel.app
   DATABASE_URL=your-neon-pooled-connection-string
   DIRECT_DATABASE_URL=your-neon-direct-connection-string
   NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-api-key
   ```

4. **Deploy**: Vercel will automatically build and deploy your app

### 3. Post-Deployment Setup

After deployment, run the database migration:
```bash
npx prisma db push
```

---

## 💝 Built with ❤️ by Vice

Thank you for using ViceForms! Happy form building! 🎉
