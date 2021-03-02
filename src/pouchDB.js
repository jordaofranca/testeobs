import PouchDB from "pouchdb-browser";

export const db = new PouchDB("connections");

export const addConnection = ({ url, password, name }) => {
  const connection = { _id: url, name, hash: btoa(url + "-" + password) };
  db.put(connection, (err, result) => {
    if (!err) {
      console.log(result);
    } else {
      console.log(err);
    }
  });
};

export const getConnections = () => {
  return new Promise((resolve, reject) => {
    db.allDocs({ include_docs: true, descending: true }, (err, result) => {
      if (!err) {
        const conns = result.rows;
        resolve(
          Array.isArray(conns) && conns.length > 0
            ? conns.map((conn) => {
                const { _id, _rev } = conn.doc;
                const [url, password] = atob(conn.doc.hash).split("-");
                return { url, password, name: conn.doc.name, _id, _rev };
              })
            : []
        );
      } else {
        reject(err);
      }
    });
  });
};

export const deleteConn = (conn, callback) => {
  return db.remove(conn, callback);
};
