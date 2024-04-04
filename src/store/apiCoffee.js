import supabase from "./supabase";

export async function getCoffee() {
  let { data, error } = await supabase.from("Coffee").select("*");

  if (error) {
    console.log(error);
  }

  return data;
}
