import React from "react";
import { gql, useMutation, useSubscription } from "@apollo/client";
import Header from "./Header";
import InputIdPasengger from "./InputIdPasengger";
import ListPassenger from "./ListPassenger";
import LoadingSVG from "./LoadingSVG";
import InputPassenger from "./InputPassenger";

const DELETE_PENGUNJUNG = gql`
  mutation MyMutation($id: Int!) {
    delete_pengunjung_by_pk(id: $id) {
      id
    }
  }
`;

const INSERT_PENGUNJUNG_ONE = gql`
  mutation MyMutation($object: pengunjung_insert_input!) {
    insert_pengunjung_one(object: $object) {
      id
    }
  }
`;

const UPDATE_PENGUNJUNG_BY_PK = gql`
  mutation MyMutation($id: Int!, $nama: String, $umur: Int, $jenisKelamin: String) {
    update_pengunjung_by_pk(pk_columns: { id: $id }, _set: { nama: $nama, umur: $umur, jenisKelamin: $jenisKelamin }) {
      id
    }
  }
`;

const SUBSCRIPTION = gql`
  subscription MySubscription {
    pengunjung {
      id
      jenisKelamin
      nama
      umur
    }
  }
`;

function Home() {
  // const { data, loading } = useQuery(GET_PENGUNJUNG);
  const [deletePengunjung, { loading: loadingDelete }] = useMutation(DELETE_PENGUNJUNG);

  const [insertPengunjung, { loading: loadingInsert }] = useMutation(INSERT_PENGUNJUNG_ONE);

  const [updatePengunjung, { loading: loadingUpdate }] = useMutation(UPDATE_PENGUNJUNG_BY_PK);

  const { data, loading } = useSubscription(SUBSCRIPTION);
  return (
    <div>
      <Header />
      <InputIdPasengger />
      {loading || loadingDelete || loadingUpdate ? <LoadingSVG /> : <ListPassenger data={data.pengunjung} deletePengunjung={deletePengunjung} updatePengunjung={updatePengunjung} />}

      {loadingInsert ? <LoadingSVG /> : <InputPassenger insertPengunjung={insertPengunjung} />}
    </div>
  );
}

export default Home;
