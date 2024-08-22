function UnitComponent(name: string, value: number, handler: Event) {
  return (
    <>
      <span>{name}:</span>
      <input type="number" name={name} value={value} onChange={handler} />
    </>
  );
}

export default UnitComponent;
