
import axios from "axios";

const instance = axios.create({
  baseURL: "http://89.108.76.139:8081",
  // withCredentials: true,
});

export const login = (data) => {
  return instance
    .post("/auth/login", data)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err.response;
    });
};

export const register = (data) => {
  return instance
    .post("/auth/register", data)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err.response;
    });
};

export const getShops = (token, offset, limit) => {
  const params = new URLSearchParams();
  params.set("offset", offset);
  params.set("limit", limit);
  return instance
    .get("/shops?" + params.toString(), {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err.response;
    });
};

export const getShop = (token, id) => {
  return instance
    .get("/shops/" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err.response;
    });
};

export const deleteShop = (token, id) => {
  return instance
    .delete("/shops/" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err.response;
    });
};

export const deleteRegion = (token, regionId) => {
  return instance
    .delete("/regions/" + regionId, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err.response;
    });
};

export const changeShop = (token, id, data) => {
  return instance
    .put(
      "/shops/" + id,
      {
        ...data,
        pagesInProcess: 0,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err.response;
    });
};

export const changeRegion = (token, id, data) => {
  return instance
    .put(
      "/regions/" + id,
      {
        ...data,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err.response;
    });
};

export const addShop = (token, data) => {
  return instance
    .post(
      "/shops",
      {
        ...data,
        pagesInProcess: 0,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err.response;
    });
};

export const runCode = (token, code, url) => {
  return instance
    .post(
      "/run",
      {
        code,
        url,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err.response;
    });
};

export const checkToken = (token) => {
  return instance
    .get("/auth/check", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err.response;
    });
};

//REGIONS

export const addRegion = (token, shopId, data) => {
  return instance
    .post(
      `/shops/${shopId}/regions`,
      {
        ...data,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err.response;
    });
};

export const getRegions = (token, shopId) => {
  return instance
    .get(`/shops/${shopId}/regions`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err.response;
    });
};
