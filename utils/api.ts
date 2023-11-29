const createURL = (path) => {
  return window.location.origin + path;
};

export const createNewEntry = async () => {
  const res = await fetch(
    new Request(createURL("/api/scribe"), {
      method: "POST",
    })
  );

  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
};

export const updateEntry = async (id, content) => {
  const res = await fetch(new Request(createURL(`/api/scribe/${id}`)), {
    method: "PATCH",
    body: JSON.stringify({ content }),
  });

  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
};
