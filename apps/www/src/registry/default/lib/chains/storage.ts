import { persistentAtom } from "@nanostores/persistent";
import { computed, type ReadableAtom, type WritableAtom } from "nanostores";
import type { Network } from "@/registry/default/lib/chains/network";

type StorageAccount = Storage<string | undefined>;
type StorageNetwork = Storage<Network["id"]>;

class Storage<T> {
  private readonly atom: WritableAtom<T | undefined>;
  readonly key: string;
  readonly initial: T | undefined;

  constructor(key: string, initial?: T) {
    this.key = key;
    this.initial = initial;
    this.atom = persistentAtom<T | undefined>(key, initial, {
      encode: JSON.stringify,
      decode: JSON.parse,
    });
  }

  get() {
    return this.atom.get();
  }

  set(value: T | undefined) {
    this.atom.set(value);
  }

  get value(): ReadableAtom<T | undefined> {
    return computed(this.atom, (value) => value);
  }
}

function createStorage<T>(key: string, defaultValue?: T): Storage<T> {
  return new Storage<T>(key, defaultValue);
}

function createStorageAccount(key = "wallet-kit:account") {
  return createStorage<string | undefined>(key);
}

function createStorageNetwork(key = "wallet-kit:network") {
  return createStorage<Network["id"]>(key);
}

export {
  Storage,
  type StorageAccount,
  type StorageNetwork,
  createStorageAccount,
  createStorageNetwork,
};
