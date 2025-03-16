interface DocumentIDPageProps {
  params: Promise<{ documentId: string }>;
}

export default async ({ params }: DocumentIDPageProps) => {
  const { documentId } = await params;
  return (
    <div>
      <h1>Document {documentId}</h1>
    </div>
  );
};
