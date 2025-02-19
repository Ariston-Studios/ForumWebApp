function BorderlessInput(props: any) {
  return (
    <div className={`col-span-${props.colSpan} relative my-3`}>
      <input
        className={`peer w-full h-10 border-b-2 border-gray-500 focus:outline-none focus:border-b-2 focus:border-fuchsia-600`}
        name={props.name}
        type={props.type}
        onChange={props.onChange}
        placeholder=" "
        required
      />
      <label
        className={`absolute ${(props.isMatching !== null && props.isMatching) ? "dark:text-red-500" : "dark:text-gray-500"} text-md -top-2 left-0 transition-all peer-focus:text-fuchsia-600 peer-focus:text-sm peer-focus:-top-3 peer-focus:left-0 peer-placeholder-shown:top-3 peer-placeholder-shown:text-md peer-not-placeholder-shown:text-sm pointer-events-none`}
        htmlFor={props.name}
      >
        {props.label}
      </label>
    </div>
  );
}

export default BorderlessInput;
