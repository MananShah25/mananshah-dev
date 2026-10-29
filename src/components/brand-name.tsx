// First name in the text color, last name in an orange gradient
export function BrandName({ name }: { name: string }) {
  const split = name.lastIndexOf(" ");
  const first = name.slice(0, split);
  const last = name.slice(split + 1);

  return (
    <>
      {first}{" "}
      <span className="bg-linear-to-r from-accent to-accent-bright bg-clip-text text-transparent">{last}</span>
    </>
  );
}
