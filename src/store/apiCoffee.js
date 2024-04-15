import supabase from "./supabase";

export async function getCoffee() {
  let { data, error } = await supabase.from("prices").select("*");

  console.log('errs',error);
  console.log('data',data);

  return data;
}
