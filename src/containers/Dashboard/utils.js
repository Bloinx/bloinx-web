import supabase from "../../supabase";

export const getRoundsList = async () => {
  const user = supabase.auth.user();

  const { data, error } = await supabase
    .from("round")
    .select()
    .eq("createByUser", user.id);
  console.log(data);

  if (!error) {
    return data;
  } else {
    return error;
  }
};
