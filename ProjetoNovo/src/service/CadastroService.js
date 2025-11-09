import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebaseConnections";

// Cria a coleção "Usuários"
const usuariosCollection = collection(db, "usuarios");


// 🔹 Criar Usuário
export const criarCadastro = async (usuario) => {
  const payload = {
    nome: usuario.nome,
    telefone: usuario.telefone,
    CPF: usuario.CPF,
    cep: usuario.cep || "",
    logadouro: usuario.logadouro || "",
    bairro: usuario.bairro || "",
    cidade: usuario.cidade || "",
    UF: usuario.UF || "",
    createdAt: serverTimestamp(),
  };

  const ref = await addDoc(usuariosCollection, payload);
  return ref.id;
};


export const subscribeUsuarios = (callback, errorCallback) => {
  const q = query(usuariosCollection, orderBy("createdAt", "desc"));
  return onSnapshot(
    q,
    (snapshot) => {
      const itens = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      callback(itens);
    },
    errorCallback
  );
};


export const obterUsuarios = async () => {
  const snap = await getDocs(usuariosCollection);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};


export const obterUsuarioPorId = async (id) => {
  const docRef = doc(db, "usuarios", id);
  const d = await getDoc(docRef);
  if (!d.exists()) return null;
  return { id: d.id, ...d.data() };
};


// 🔹 Atualizar usuário
export const atualizarUsuario = async (id, dados) => {
  const docRef = doc(db, "usuarios", id);
  await updateDoc(docRef, { ...dados, updatedAt: serverTimestamp() });
};


// 🔹 Deletar usuário
export const deletarUsuario = async (id) => {
  const docRef = doc(db, "usuarios", id);
  await deleteDoc(docRef);
};
