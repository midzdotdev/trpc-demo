import { useDebounce } from "@/utils/useDebounce";
import { NextPage } from "next";
import React, { useState } from "react";
import { trpc } from "../utils/trpc";

const IndexPage: NextPage = () => {
  return (
    <div>
      <h1>tRPC Demo</h1>

      <h2>Greet</h2>
      <Greet />

      <h2>Server System Time</h2>
      <ServerTime />

      <h2>Counter</h2>
      <Counter />
    </div>
  );
}

export default IndexPage;

const Greet = () => {
  const [name, setName] = useState("world");
  const debouncedName = useDebounce(name, 700);

  const greeting = trpc.useQuery(["greet", { name: debouncedName }]);

  return (
    <>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <p>{greeting.data?.greeting ?? "Loading"}</p>
    </>
  );
};

const ServerTime = () => {
  const serverTime = trpc.useQuery(["time.now"]);

  return (
    <>
      <p>{serverTime.data?.now.toString()}</p>
      <button onClick={() => serverTime.refetch()}>&#8635;</button>
    </>
  );
};

const Counter = () => {
  const counter = trpc.useQuery(["counter.get"], {
    // refetchInterval: 1000,
  });

  const utils = trpc.useContext();

  const stepCounter = trpc.useMutation("counter.step", {
    onSuccess: () => {
      utils.invalidateQueries(["counter.get"]);
    },
  });

  return (
    <>
      <button onClick={() => stepCounter.mutate({ direction: "decrement" })}>
        -
      </button>

      <p>{counter.data?.value ?? "Loading"}</p>

      <button onClick={() => stepCounter.mutate({ direction: "increment" })}>
        +
      </button>
    </>
  );
};
