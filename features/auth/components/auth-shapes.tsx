import Image from "next/image";

export function AuthShapes() {
  return (
    <>
      <Image
        src="/images/shape1.svg"
        alt=""
        width={220}
        height={220}
        className="pointer-events-none absolute top-0 left-0 block dark:hidden"
        priority
      />
      <Image
        src="/images/dark_shape.svg"
        alt=""
        width={220}
        height={220}
        className="pointer-events-none absolute top-0 left-0 hidden dark:block"
        priority
      />
      <Image
        src="/images/shape2.svg"
        alt=""
        width={220}
        height={220}
        className="pointer-events-none absolute top-0 right-0 block dark:hidden"
        priority
      />
      <Image
        src="/images/dark_shape1.svg"
        alt=""
        width={220}
        height={220}
        className="pointer-events-none absolute top-0 right-0 hidden dark:block"
        priority
      />
      <Image
        src="/images/shape3.svg"
        alt=""
        width={220}
        height={220}
        className="pointer-events-none absolute right-0 bottom-0 block dark:hidden"
        priority
      />
      <Image
        src="/images/dark_shape2.svg"
        alt=""
        width={220}
        height={220}
        className="pointer-events-none absolute right-0 bottom-0 hidden dark:block"
        priority
      />
    </>
  );
}
