export const correctEmail = (email) => {
  return email.match(
    /(^(?!.*__.*)[a-z0-9]{4,253}(_?)[a-z0-9]+(?:\.[a-z0-9!#$%&*+\/=?^`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9]*[a-z0-9])?$)/
  );
};
