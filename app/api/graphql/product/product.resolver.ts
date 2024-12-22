import { ProductInput, ProductTypeData, PromoteProductInput, RemoveProductsInput, UpdateProductInput } from './product.types';

import { Firestore } from 'firebase-admin/firestore';
const products = async (_: undefined, __: undefined, { dbFirestore }: { dbFirestore: Firestore }): Promise<Array<ProductTypeData> | null> => {
  try {
    const products: Array<ProductTypeData> | null = [];
    const querySnapshot = await dbFirestore.collection('products').orderBy('createdAt', 'desc').get();
    querySnapshot.forEach((doc: unknown) => {
      products.push({ id: doc?.id, ...doc?.data() });
    });
    return products;
  } catch (error) {
    console.log({ error });
    return Promise.reject(error);
  }
};

const productsById = async (
  _: undefined,
  { id }: { id: string },
  { dbFirestore }: { dbFirestore: Firestore }
): Promise<Array<ProductTypeData> | null> => {
  try {
    const products: Array<ProductTypeData> = [];
    return dbFirestore
      .collection('products')
      .where('author', '==', `${id}`)
      .get()
      .then((querySnapshot: unknown) => {
        querySnapshot?.forEach((doc: unknown) => {
          products.push({ id: doc.id, ...doc.data() });
          /*   console.log({ productDoc: doc.data() }) */
        });

        return products;
      });
  } catch (error) {
    console.log({ error });
    return Promise.reject(error);
  }
};

const productsByEmail = async (
  _: undefined,
  { email }: { email: string },
  { dbFirestore }: { dbFirestore: Firestore }
): Promise<Array<ProductTypeData> | null> => {
  try {
    const products: Array<ProductTypeData> = [];
    return dbFirestore
      .collection('products')
      .where('author', '==', `${email}`)
      .get()
      .then((querySnapshot: unknown) => {
        querySnapshot.forEach((doc: unknown) => {
          products.push({ id: doc.id, ...doc.data() });
        });
        return products;
      });
  } catch (error) {
    console.log({ error });
    return Promise.reject(error);
  }
};

const product = async (
  _: undefined,
  { titleSlug }: { titleSlug: string },
  { dbFirestore }: { dbFirestore: Firestore }
): Promise<ProductTypeData | null> => {
  try {
    return dbFirestore
      .collection('products')
      .doc(titleSlug)
      .get()
      .then((snapshot: unknown) => ({
        id: snapshot.id,
        ...snapshot.data()
      }));
  } catch (error: unknown) {
    throw error;
  }
};

const discounts = async (
  _: undefined,
  __: undefined,
  { dbFirestore }: { dbFirestore: Firestore }
): Promise<Array<ProductTypeData> | null> => {
  try {
    const products: Array<ProductTypeData> = [];
    return dbFirestore
      .collection('products')
      .where('discount', '==', true)
      .get()
      .then((querySnapshot: unknown) => {
        querySnapshot.forEach((doc: unknown) => {
          products.push({ id: doc.id, ...doc.data() });
          /*   console.log({ productDoc: doc.data() }) */
        });

        return products;
      });
  } catch (error) {
    throw error;
  }
};

const vracs = async (_: undefined, __: undefined, { dbFirestore }: { dbFirestore: Firestore }): Promise<Array<ProductTypeData> | null> => {
  try {
    const products: Array<ProductTypeData> = [];
    return dbFirestore
      .collection('products')
      .where('productStatus', '==', 'VRAC')
      .get()
      .then((querySnapshot: unknown) => {
        querySnapshot?.forEach((doc: unknown) => {
          // console.log({ doc })
          products.push({ id: doc.id, ...doc.data() });
          /*   console.log({ productDoc: doc.data() }) */
        });

        return products;
      });
  } catch (error) {
    throw error;
  }
};
// Mutations

const addProduct = async (
  _: undefined,
  { input }: { input: ProductInput },
  {
    dbFirestore,
    slug,
    timeStamp
  }: { dbFirestore: Firestore; slug: (arg: string) => string; storageRef: unknown; currentProfile: unknown; timeStamp: unknown; req: unknown }
): Promise<ProductTypeData | undefined> => {
  try {
    const { title, description, price, image, productStatus, stock, promo, author, selection, discount = false } = input;
    const imageUrl = image.url ? image : { url: 'https://via.placeholder.com/200x200.png', public_id: '00000000' };
    //const { uid } = currentProfile;
    const titleSlug = slug(title);
    const createdAt = timeStamp;
    const product = {
      title,
      titleSlug,
      description,
      price,
      author,
      image: imageUrl,
      productStatus,
      discount,
      stock,
      promo,
      selection,
      createdAt
    };
    try {
      const docRef = dbFirestore.collection('profiles').doc(`${author}`);
      await docRef
        .get()
        .then((snapshot: unknown) => {
          if (snapshot.exists) {
            docRef.set({ products: [...snapshot?.data()['products'], titleSlug] });
          }
        })
        .catch((error: unknown) => {
          throw new Error(error);
        });

      const productRef = await dbFirestore.collection('products').doc(titleSlug);
      return productRef.get().then(async (snapshot: unknown) => {
        if (snapshot.exists) {
          await productRef.set({ ...product }, { merge: true });
          const selectionRef = await dbFirestore.collection('selections').doc(`${selection}`);
          const snapshot = await selectionRef.get();
          //          console.log({ selectionsProducts: snapshot.data().products })
          const products = [...snapshot.data().products, titleSlug];
          //console.log({ products })
          try {
            await selectionRef.update({ products });
          } catch (error: unknown) {
            throw error;
          }
        } else {
          await productRef.set(product);
          // Mangt add products to selection
          const selectionRef = await dbFirestore.collection('selections').doc(`${selection}`);
          // console.log({ selection: selectionSnapshot.data().products })
          const snapshot = await selectionRef.get();
          const prevProducts = Array.isArray(snapshot.data().products) ? snapshot.data().products : null;

          const products = prevProducts ? [...prevProducts, titleSlug] : [titleSlug];

          try {
            await selectionRef.update({ products });
          } catch (error: unknown) {
            throw error;
          }
          const newProdSnap = await productRef.get();
          return { ...newProdSnap.data() };
        }
      });
    } catch (error: unknown) {
      throw error;
    }
  } catch (error: unknown) {
    throw error;
  }
};

const makeDiscount = async (
  _: undefined,
  { input }: { input: ProductInput },
  {
    dbFirestore,
    slug,
    timeStamp
  }: { dbFirestore: Firestore; slug: unknown; storageRef: unknown; currentProfile: unknown; timeStamp: unknown; req: unknown }
): Promise<ProductTypeData | undefined> => {
  try {
    const { title, description, price, image, productStatus, stock, promo, author, selection, discount } = input;
    const imageUrl = image.url ? image : { url: 'https://via.placeholder.com/200x200.png', public_id: '00000000' };
    //const { uid } = currentProfile;
    const titleSlug = slug(title);
    const createdAt = timeStamp;
    const product = {
      title,
      titleSlug,
      description,
      price,
      author,
      image: imageUrl,
      productStatus,
      stock,
      promo,
      discount,
      selection,
      createdAt
    };
    try {
      const productRef = await dbFirestore.collection('products').doc(titleSlug);
      return productRef.get().then(async (snapshot: unknown) => {
        if (snapshot.exists) {
          await productRef.set({ ...product }, { merge: true });
          const selectionRef = await dbFirestore.collection('selections').doc(`${selection}`);
          const snapshot = await selectionRef.get();
          //          console.log({ selectionsProducts: snapshot.data().products })
          const products = [...snapshot.data().products, titleSlug];
          //console.log({ products })
          try {
            await selectionRef.update({ products });
          } catch (error: unknown) {
            throw error;
          }
        } else {
          await productRef.set(product);
          // Mangt add products to selection
          const selectionRef = await dbFirestore.collection('selections').doc(`${selection}`);
          // console.log({ selection: selectionSnapshot.data().products })
          const snapshot = await selectionRef.get();
          const prevProducts = Array.isArray(snapshot.data().products) ? snapshot.data().products : null;

          const products = prevProducts ? [...prevProducts, titleSlug] : [titleSlug];

          try {
            await selectionRef.update({ products });
          } catch (error: unknown) {
            throw error;
          }
          return productRef.get().then((snapshot: unknown) => snapshot.data());
        }
      });
    } catch (error: unknown) {
      throw error;
    }
  } catch (error: unknown) {
    throw error;
  }
};

// UPDATE PRODUCT
const updateProduct = async (
  _: undefined,
  { input }: { input: UpdateProductInput },
  { dbFirestore }: { dbFirestore: Firestore }
): Promise<ProductTypeData | null> => {
  const { titleSlug, selection, ...rest } = input;

  try {
    await dbFirestore
      .collection('products')
      .doc(titleSlug)
      .set({ ...rest, selection }, { merge: true });
    const querySnapshot = await dbFirestore.collection('products').doc(`${titleSlug}`).get();
    if (querySnapshot.exists) {
      const product = querySnapshot.data();

      const selectionRef = await dbFirestore.collection('selections').doc(`${selection}`);
      // console.log({ selection: selectionSnapshot.data().products })
      const snapshot = await selectionRef.get();
      const products = [...snapshot.data().products, titleSlug];

      try {
        await selectionRef.update({ products });
      } catch (error: unknown) {
        throw error;
      }
      return product;
    } else {
      throw new Error('cant find  product titleSlug');
    }
  } catch (error: unknown) {
    throw error;
  }
};
//
// UPDATE PRODUCT
const promoteProduct = async (
  _: undefined,
  { input }: { input: PromoteProductInput },
  { dbFirestore, FieldValue }: { dbFirestore: Firestore; FieldValue: unknown }
): Promise<{ success: boolean } | null> => {
  const { titleSlug, selectionSlug, profile, rate } = input;
  console.log({ titleSlug, selectionSlug, profile, rate });

  try {
    await dbFirestore
      .collection('products')
      .doc(titleSlug)
      .update({
        poromotedBy: FieldValue.arrayUnion({ profile, rate })
      });
    try {
      await dbFirestore
        .collection('profiles')
        .doc(profile)
        .update({
          productsPromoted: FieldValue.arrayUnion({
            selectionSlug,
            titleSlug,
            rate
          })
        });
    } catch (error) {
      return { success: false };
    }
    return { success: true };
  } catch (error: unknown) {
    throw error;
  }
};
const removeProducts = async (
  _: undefined,
  { input }: { input: RemoveProductsInput },
  { dbFirestore, cloudinary, FieldValue }: { FieldValue: unknown; dbFirestore: Firestore; cloudinary: unknown }
): Promise<{ success: boolean }> => {
  try {
    console.log({ input });
    input.forEach(async (elm) => {
      const resultat = await dbFirestore.collection('products').doc(elm.slug).delete();
      const selectionRef = await dbFirestore.collection('selections').doc(elm.selection);

      await selectionRef.update({
        products: FieldValue.arrayRemove(elm.slug)
      });
      console.log(resultat);
      await cloudinary.uploader.destroy(elm.image_id, function (result: unknown) {
        console.log(result);
      });
    });
    return { success: true };
  } catch (error: unknown) {
    throw error;
  }
};
const Product = {
  titleSlug: async (product: ProductTypeData, _: undefined, { slug }: { slug: (arg: string) => void }): Promise<string | undefined> => {
    return slug(product?.title);
  },
  _id: async (selection: ProductTypeData, __: undefined, { slug }: { slug: unknown }): Promise<string | undefined> => {
    return slug(selection.title);
  }
};

const ProductResolver = {
  Product,
  Query: {
    products,
    discounts,
    vracs,
    product,
    productsById,
    productsByEmail
  },
  Mutation: {
    addProduct,
    makeDiscount,
    updateProduct,
    promoteProduct,
    removeProducts
  }
};
export default ProductResolver;
