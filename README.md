# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/d09d3d70-fd45-40d7-af3c-a526b11a39e7

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/d09d3d70-fd45-40d7-af3c-a526b11a39e7) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/d09d3d70-fd45-40d7-af3c-a526b11a39e7) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
# garcommatch

## Supabase Configuration

To enable authentication with Supabase, create a `.env` file in the project root with the following variables:

```
VITE_SUPABASE_URL=https://cfdoxhlhsedbohangdsr.supabase.co
VITE_SUPABASE_ANON_KEY=<your anon key>
```

Ensure that the `users` table exists in your Supabase project. The following SQL
snippet can be used to create it with Row Level Security enabled:

```sql
create table if not exists public.users (
  id uuid primary key references auth.users,
  name text not null,
  email text not null,
  phone text,
  city text,
  category text,
  description text,
  user_type text not null
);

alter table public.users enable row level security;
create policy "Authenticated CRUD" on public.users
  for all using (auth.uid() = id);
```

Install dependencies (including `@supabase/supabase-js`) and run the development server:

```
npm install
npm run dev
```

During registration, new accounts are inserted into the `users` table once the
session is available. If your project requires e‑mail confirmation, the row will
be created after the user verifies and signs in. Make sure this table exists in
your Supabase project with Row Level Security enabled for authenticated users.

### Disable e‑mail confirmation

If you prefer to allow sign ups without requiring users to confirm their e‑mail
address, open your Supabase project and navigate to **Auth → Settings → Email**.
Disable the **Confirm email** option and save the changes. New registrations
will then return a session immediately, skipping the "Verifique seu e‑mail"
message displayed in the app.

If you encounter the message “for security purposes, you can only request this
after …”, remove any unverified user from the **Authentication** panel or wait a
few minutes before trying again.
