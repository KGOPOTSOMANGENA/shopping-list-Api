export default function ShareButton({ listId }: { listId: string }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}/home?list=${listId}`);
    alert("Link copied!");
  };

  return <button onClick={handleCopy}>Share List</button>;
}
