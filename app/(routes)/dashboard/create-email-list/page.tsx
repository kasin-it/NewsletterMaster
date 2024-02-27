import CreateEmailListForm from "./_components/create-email-form"

function CreateEmaiListPage() {
   return (
      <main className="container flex max-w-6xl flex-col gap-5 pt-40">
         <h1 className="text-5xl font-bold">Create email list</h1>
         <CreateEmailListForm />
      </main>
   )
}
export default CreateEmaiListPage
