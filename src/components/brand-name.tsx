// First name in the text color, last name in solid bright orange
export function BrandName({ name }: { name: string }) {
  const split = name.lastIndexOf(" ");
  const first = name.slice(0, split);
  const last = name.slice(split + 1);

  return (
    <>
      {first}{" "}
      <span className="text-accent-bright">{last}</span>
    </>
  );
}
