export const extract = (params, object) => {
  if (params.length === 1) return object[params];
  return params
    .reduce((cur, next) => {
      cur[next] = object[next];
      return cur;
    }, {});
};

export const getTabInfo = ({
  url, id, favIconUrl, title
}) => ({
  url,
  id,
  favIconUrl,
  title
});
