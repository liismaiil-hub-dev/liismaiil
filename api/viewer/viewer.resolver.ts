import { DateTimeResolver } from 'graphql-scalars';
import {

  SigninViewerInput, ViewerTypeData,

  PROFILE_STATUS_ENUM,
  EventTypeData,
} from './viewer.types';




export const viewer = async (
  _: undefined,
  { email }: { email: string },
  { ViewerModel }: { ViewerModel: any }
): Promise<ViewerTypeData | undefined> => {
  try {
    const viewer = await ViewerModel?.findOne({
      email
    }).lean().exec();
    return viewer
  } catch (error: any) {
    throw error;
  }
};

export const viewerById = async (
  _: undefined,
  { id }: { id: string },
  { ViewerModel }: { ViewerModel: any }
): Promise<ViewerTypeData | undefined> => {
  try {
    const viewer = await ViewerModel?.findOne({
      _id: id
    }).lean().exec();
    return { ...viewer, _id: viewer._id }
  } catch (error: any) {
    throw error;
  }
};


export const enrollmentsByEmail = async (
  _: undefined,
  { email }: { email: string },
  { ViewerModel }: { ViewerModel: any }
): Promise<Array<EnrollmentType> | undefined> => {
  try {
    const enrollments = await ViewerModel.findOne({
      email
    }).select('enrollmentAll').lean().exec();
    return enrollments
  } catch (error: any) {
    throw error;
  }
};

const viewers = async (
  _: undefined,
  __: undefined,
  { ViewerModel }: { ViewerModel: any }
): Promise<ViewerTypeData[] | undefined> => {
  try {
    const viewers = await ViewerModel.find({}).limit(50).lean().exec();
    return viewers
  } catch (error: any) {
    console.log({ error });
    throw error;
  }
};

export const getGuestProfiles = async (
  _: undefined,
  { email }: { email: string },
  { ViewerModel }: { ViewerModel: any }
): Promise<{ success: boolean, message: Array<ConnexionProfileType> } | undefined> => {
  try {
    const enrollments = await ViewerModel.findOne({
      email
    }).select('guestProfiles').lean().exec();
    if (enrollments && enrollments.length > 0) {
      return { success: true, message: enrollments }
    } else {
      return ({
        success: false, message: [{
          title: '',
          description: '',
          token: '',
          profileEmail: '',
          profileId: '',
          flag: '',
          price: -1,
          startDate: '',
          endDate: '',
          status: PROFILE_STATUS.GUEST,
        }]
      })
    }
  } catch (error: any) {
    throw error;
  }
};

const getEvents = async (
  _: undefined,
  { id }: { id: string },
  { dbFirestore }: { dbFirestore: Firestore }
): Promise<{ success: boolean, events: EventTypeData[] } | undefined> => {
  try {
    //  const currentUser = await auth.verifyIdToken(req.headers.authtoken);
    const dbProfiles = dbFirestore.collection('profiles');

    if (id) {
      const profileRef = await dbProfiles.doc(id);
      const profileSnapshot = await profileRef.get()
      if (typeof profileSnapshot !== 'undefined' && profileSnapshot.exists && typeof profileSnapshot?.data() !== 'undefined' &&
        typeof profileSnapshot?.data()?.events !== 'undefined') {
        return { success: true, events: profileSnapshot?.data()?.events as EventTypeData[] }
      }
    } else {
      return {
        success: false, events: [{
          id: '',
          title: 'No profile was found',
          content: '',
          addressGeo: '',
          startDate: '',
          endDate: '',
          status: PROFILE_STATUS_ENUM.USER,
          contact: ''
        }]
      }
    }
  } catch (error: any) {
    throw new Error(error);
  }
};
export const getDiscountProfiles = async (
  _: undefined,
  { email }: { email: string },
  { ViewerModel }: { ViewerModel: any }
): Promise<{ success: boolean, message: Array<ConnexionProfileType> } | undefined> => {
  try {
    const enrollments = await ViewerModel.findOne({
      email
    }).select('discountProfiles').lean().exec();
    console.log({ enrollments })
    if (enrollments && enrollments.length > 0) {
      return { success: true, message: enrollments }
    } else {
      return ({
        success: false, message: [{
          title: '',
          token: '',
          description: '',
          profileEmail: '',
          profileId: '',
          flag: '',
          price: -1,
          startDate: '',
          endDate: '',
          status: PROFILE_STATUS.DISCOUNT,
        }]
      })
    }
  } catch (error: any) {
    throw error;
  }
};


export const getLiismaiilProfiles = async (
  _: undefined,
  { email }: { email: string },
  { ViewerModel }: { ViewerModel: any }
): Promise<{ success: boolean, message: Array<ConnexionProfileType> } | undefined> => {
  try {
    const enrollments = await ViewerModel.findOne({
      email
    }).select('liismaiilProfiles').lean().exec();
    console.log({ enrollments })
    if (enrollments && enrollments.length > 0) {
      return { success: true, message: enrollments }
    } else {
      return ({
        success: false, message: [{
          title: '',
          token: '',
          profileEmail: '',
          description: '',
          profileId: '',
          flag: '',
          price: -1,
          startDate: '',
          endDate: '',
          status: PROFILE_STATUS.LIISIL,
        }]
      })
    }

  } catch (error: any) {
    throw error;
  }
};
export const getLibraryProfiles = async (
  _: undefined,
  { email }: { email: string },
  { ViewerModel }: { ViewerModel: any }
): Promise<{ success: boolean, message: Array<ConnexionProfileType> } | undefined> => {
  try {
    const enrollments = await ViewerModel.findOne({
      email
    }).select('libraryProfiles').lean().exec();
    console.log({ enrollments })
    if (enrollments && enrollments.length > 0) {
      return { success: true, message: enrollments }
    } else {
      return ({
        success: false, message: [{
          title: '',
          token: '',
          profileEmail: '',
          description: '',
          profileId: '',
          flag: '',
          price: -1,
          startDate: '',
          endDate: '',
          status: PROFILE_STATUS.LIBRARY,
        }]
      })
    }

  } catch (error: any) {
    throw error;
  }
};

export const getLiismanagerProfiles = async (
  _: undefined,
  { email }: { email: string },
  { ViewerModel }: { ViewerModel: any }
): Promise<{ success: boolean, message: Array<ConnexionProfileType> } | undefined> => {
  try {
    const enrollments = await ViewerModel.findOne({
      email
    }).select('liismanagerProfiles').lean().exec();
    console.log({
      enrollments: enrollments['liismanagerProfiles']
    })
    if (enrollments && enrollments['liismanagerProfiles']?.length > 0) {
      return { success: true, message: [...enrollments['liismanagerProfiles']] }
    } else {
      return ({
        success: false, message: [{
          title: '',
          token: '',
          description: '',

          profileEmail: '',
          profileId: '',
          flag: '',
          price: -1,
          startDate: '',
          endDate: '',
          status: PROFILE_STATUS.LIIS,
        }]
      })
    }

  } catch (error: any) {
    throw error;
  }
};

export const getCollaboratorProfiles = async (
  _: undefined,
  { email }: { email: string },
  { ViewerModel }: { ViewerModel: any }
): Promise<{ success: boolean, message: Array<ConnexionProfileType> } | undefined> => {
  try {
    const colls = await ViewerModel.findOne({
      email
    }).select('collaboratorProfiles').lean().exec();
    if (colls && colls.length > 0) {
      return { success: true, message: colls }
    } else {
      return ({
        success: false, message: [{
          title: '',
          token: '',
          description: '',

          profileEmail: '',
          profileId: '',
          flag: '',
          price: -1,
          startDate: '',
          endDate: '',
          status: PROFILE_STATUS.COLL,
        }]
      })
    }

  } catch (error: any) {
    throw error;
  }
};


export const getOrganisatorProfiles = async (
  _: undefined,
  { email }: { email: string },
  { ViewerModel }: { ViewerModel: any }
): Promise<{ success: boolean, message: Array<ConnexionProfileType> } | undefined> => {
  try {
    const enrollments = await ViewerModel.findOne({
      email
    }).select('organisatorProfiles').lean().exec();
    if (enrollments && enrollments.length > 0) {
      return { success: true, message: enrollments }
    } else {
      return ({
        success: false, message: [{
          title: '',
          token: '',
          description: '',

          profileEmail: '',
          profileId: '',
          flag: '',
          price: -1,
          startDate: '',
          endDate: '',
          status: PROFILE_STATUS.ORGA,
        }]
      })
    }

  } catch (error: any) {
    throw error;
  }
};


export const getDeliverProfiles = async (
  _: undefined,
  { email }: { email: string },
  { ViewerModel }: { ViewerModel: any }
): Promise<{ success: boolean, message: Array<ConnexionProfileType> } | undefined> => {
  try {
    const enrollments = await ViewerModel.findOne({
      email
    }).select('deliverProfiles').lean().exec();
    if (enrollments && enrollments.length > 0) {
      return { success: true, message: enrollments }
    } else {
      return ({
        success: false, message: [{
          title: '',
          token: '',
          description: '',

          profileEmail: '',
          profileId: '',
          flag: '',
          price: -1,
          startDate: '',
          endDate: '',
          status: PROFILE_STATUS.DELIVER,
        }]
      })
    }
  } catch (error: any) {
    throw error;
  }
};






const frontCollaborators = async (
  _: undefined,
  __: undefined,
  { ViewerModel }: { ViewerModel: any }
): Promise<ViewerTypeData[] | undefined> => {
  try {


    const collaborators = await ViewerModel.find({ status: { $in: ['COLL', 'ORGA', 'LIIS', 'ADMIN'] } }).lean().exec();
    return collaborators
  } catch (error: any) {
    console.log({ error });
    throw error;
  }
};


export const signinViewer = async (_: undefined, { input }: { input: SigninViewerInput },
  { ViewerModel }: {
    ViewerModel: any,
  }):
  Promise<ViewerTypeData | undefined> => {
  try {
    const { email } = input;

    const viewerExist = await ViewerModel.findOne({
      email
    }).lean().exec();
    if (!viewerExist) {
      throw new Error('Wrong email or password.')
    }

    return { ...viewerExist, _id: viewerExist._id }
    // const { email, login, _id } = viewerExist;
    /* const viewerdataToken = Object.assign({}, { login, email, id: _id.toString() });
    const token = createToken(viewerdataToken);
    await storeRefreshToken(token, viewerdataToken.id); */




  } catch (error: any) {
    throw new Error(` ${error.message}`)
  }
}


//Mutations
const addViewer = async (_: undefined, { input }: { input: AddViewerInput },
  { ViewerModel, hashPassword, slug, genRandomToken }: {
    ViewerModel: any, slug: (arg: string) => string, hashPassword: (arg: string) => {}
  }):
  Promise<AddViewerOutput | undefined> => {
  try {
    const { login, email, uid, phone, status, city, state, country, contact } = input;
    console.log(input)
    const viewerData = {
      login,
      email,
      phone,
      uid,
      status,
      city,
      state,
      country,

      contact,

    };
    const existingViewer = await ViewerModel.findOne({
      email
    }).exec();
    console.log({ slugExisting: slug(existingViewer.login), slugLogin: slug(login) })

    if (existingViewer) {
      existingViewer.phone = existingViewer.phone === phone ? existingViewer.phone : phone
      existingViewer.uid = existingViewer.uid === uid ? existingViewer.uid : uid
      existingViewer.status = existingViewer.status === status ? existingViewer.status : status
      existingViewer.city = existingViewer.city === city ? existingViewer.city : city
      existingViewer.country = existingViewer.country === country ? existingViewer.country : country
      existingViewer.state = existingViewer.state === state ? existingViewer.state : state
      existingViewer.contact = existingViewer.contact === contact ? existingViewer.contact : contact
      existingViewer.password = await hashPassword(uid)
      await existingViewer.save()
      console.log({ existingViewer })
      const myViewer = await viewer(_, { email }, { ViewerModel })
      return { ...myViewer!, _id: myViewer?._id! }

    } else {
      const token = await genRandomToken()
      const hashedPassword = await hashPassword(token)
      const newViewer = new ViewerModel({ ...viewerData, password: hashedPassword });
      await newViewer.save();
      const myViewer = await viewer(_, { email }, { ViewerModel })
      return { ...myViewer!, _id: myViewer?._id! }
    }
  } catch (error: any) {

    throw error
  }
}


const updateViewer = async (
  _: undefined,
  { input }: { input: UpdateViewerInput },
  { ViewerModel }:
    { ViewerModel: any }): Promise<ViewerTypeData | undefined> => {
  try {
    const { email, login, bio, phone, role, website, instagram, avatar } = input
    console.log(input)

    const savedViewer = await ViewerModel.findOne({ email }).exec();
    if (savedViewer) {
      console.log({ savedViewer })

      if (login !== null && (typeof login !== 'undefined')) {
        savedViewer.login = login
      }
      if (role !== null && (Array.isArray(role))) {
        savedViewer.role = role
      }
      if (bio !== null && (typeof bio !== 'undefined')) {
        savedViewer.bio = bio.trim()
      }
      if (phone !== null && (typeof phone !== 'undefined')) {
        savedViewer.phone = phone?.trim()
      }
      if (website !== null && (typeof website !== 'undefined')) {
        savedViewer.website = website?.trim()
      }
      if (instagram !== null && (typeof instagram !== 'undefined')) {

        savedViewer.instagram = instagram?.trim()
      } if (avatar !== null && typeof avatar !== 'undefined') {

        savedViewer.avatar = avatar
      }

      try {
        await savedViewer.save()
        const newViewer = await ViewerModel.findById(savedViewer._id).lean().exec()
        const reNewViewer = { ...newViewer, _id: savedViewer._id, avatar: { url: newViewer?.avatar?.url ? newViewer?.avatar?.url : '', public_id: newViewer?.avatar?.public_id ? newViewer.avatar.public_id : '' } }
        console.log({ reNewViewer })
        return reNewViewer
      } catch (error: any) {
        throw error;
      }
    } else {
      throw new Error('cant save the modifications')
    }
  } catch (error: any) {
    // console.error(error);
    throw error;
  }
};

const updateViewerStatus = async (
  _: undefined,
  { input }: { input: UpdateViewerStatusInput },
  { ViewerModel }:
    { ViewerModel: any }): Promise<UpdateViewerStatusOutput | undefined> => {
  try {
    const { email, status, } = input
    console.log(input)

    const savedViewer = await ViewerModel.findOne({ email }).exec()!;
    if (savedViewer && (status !== null && status !== '')) {


      savedViewer.status = status
      try {
        await savedViewer.save()

        return { success: true, status }
      } catch (error: any) {
        return ({ success: false, status })
      }



    } else {
      return ({ success: false, status })

    }
  } catch (error: any) {
    throw error
  }
};

const setFlagAvatar = async (
  _: undefined,
  { input: { id, name } }: { input: { name: string, id: string } },
  { ViewerModel }:
    { ViewerModel: any }): Promise<ViewerTypeData | undefined> => {
  try {
    console.log({ id, name })

    const savedViewer = await ViewerModel.findOneAndUpdate({ _id: id },
      { flagAvatar: name }, { new: true, upsert: true }).exec();

    if (savedViewer) {
      return { ...savedViewer, _id: savedViewer._id }
    } else {
      throw new Error('cant save the modifications')
    }
  } catch (error: any) {
    // console.error(error);
    throw error;
  }
};

const registerEvent = async (
  _: undefined,
  { input }: { input: RegisterEventInput },
  { ViewerModel, dbFirestore }:
    {
      ViewerModel: any, dbFirestore: Firestore
    }): Promise<{ success: boolean, message: string } | undefined> => {
  const { collaboratorEmail, collaboratorId, event } = input;
  try {

    const doc = await ViewerModel.findOne({ email: collaboratorEmail }).exec()
    console.log({ events: doc.events })
    doc.events = [...doc.events, event]
    doc.save()
    try {
      const firestoreEvent = await dbFirestore.collection('events').doc(collaboratorId).collection('events').doc(event.id).set(event)
      return { success: true, message: `${firestoreEvent.id} is id of event ${event} registred` }
    } catch (error) {
      return { success: false, message: `${error} error occurs when registering ${event} on google firebase` }

    }


  } catch (error: any) {
    return { success: false, message: `${error} error occurs when registering ${event} on atlas` }


  }
}


const removeEvent = async (
  _: undefined,
  { input }: { input: RemoveEventInput },
  { ViewerModel, slug, dbFirestore }: { ViewerModel: any, slug: () => {}, dbFirestore: Firestore }
): Promise<{ success: boolean, message: string } | undefined> => {
  try {
    const { collaboratorEmail, collaboratorId, id, status } = input
    console.log({ input })
    const viewer = await ViewerModel.findOne({ email: collaboratorEmail }).exec()
    if (viewer && typeof viewer.events !== 'undefined' && viewer.events.length > 0) {
      const newEvents = viewer.events.filter((event: EventTypeData) => {
        if (event.id === id && event.status === status) {
          return
        } else return event
      }
      )
      // ATLAS SAVED
      viewer.events = newEvents
      await viewer.save()

      try {
        const firestoreEvent = await dbFirestore.collection('events').doc(collaboratorId).collection('events').doc(id).delete()
      } catch (error) {
        return { success: false, message: `${error} error occurs when registering ${event} on google firebase` }

      }
      return { success: true, message: `${id}  event deleted from ${collaboratorEmail} viewer` }

    } else {

      return { success: false, message: 'No events found ' }
    }
  } catch (error: FirestoreError | unknown) {
    return { success: false, message: JSON.stringify(error) }
      ;
  }
};


const registerEmailListing = async (
  _: undefined,
  { email }: { email: string },
  { ViewerModel, }:
    {
      ViewerModel: any,
    }): Promise<{ success: boolean } | undefined> => {
  try {
    return ViewerModel.findOne({ email: "kazdhicham@gmail.com" }).then((doc) => {
      if (doc?.emailListing.length !== 0) {
        console.log(doc.emailListing.length)
        const exists = doc.emailListing.filter(registred => registred.email === email)
        console.log({ exists })

        if (exists.length === 0) {
          doc.emailListing = [...doc.emailListing, { email, date: new Date() }]

          doc.save()
          return { success: true }
        } else {
          doc.emailListing = [{ email, date: new Date() }]
          doc.save()
          return { success: true }

        }
      } else {

        doc.emailListing = [{ email, date: new Date() }]
        doc.save()
        return { success: true }
      }
    }).catch((error: any) => {
      console.log({ error })
      throw new Error(error)
    })
  } catch (error: any) {
    throw error
  }
}
const notifySite = async (
  _: undefined,
  { email }: { email: string },
  { ViewerModel, }:
    {
      ViewerModel: any,
    }): Promise<{ success: boolean } | undefined> => {
  try {
    return ViewerModel.findOne({ email: "kazdhicham@gmail.com" }).then((doc) => {
      if (doc?.notif.length !== 0) {
        const exists = doc.notifError.filter(registred => registred.email === email)


        if (exists.length === 0) {
          doc.notif = [...doc.notifError, { email, date: new Date() }]

          doc.save()
          return { success: true }
        } else {

          return { success: true }

        }
      } else {

        doc.notif = [{ email, date: new Date() }]
        doc.save()
        return { success: true }
      }
    }).catch((error) => {
      return { success: false }

    })
  } catch (error: any) {
    throw error
  }
}

const removeViewer = async (
  _: undefined,
  { email }: { email: string },
  { ViewerModel, res, oneWeek }: {
    oneWeek: unknown,
    res: any, cookies: unknown, ViewerModel: any
  }
): Promise<boolean> => {
  try {
    await ViewerModel.findOneAndRemove({ email });
    res.clearCookie('token', {
      httpOnly: true,
      maxAge: oneWeek
    })
    return true;
  } catch (error: any) {
    // console.error(error);
    if (error instanceof Error) {
      throw error
    } throw new Error(`${error}`)
  }
};

const removeToken = async (
  _: undefined,
  { token }: { token: string },
  { ViewerModel }: { ViewerModel: any }
): Promise<boolean> => {
  try {
    await ViewerModel.findOneAndRemove({ token: token });
    return true;
  } catch (error: any) {
    // console.error(error);
    throw error;
  }
};
const updateViewerAddress = async (_: undefined,
  { input }: { input: UpdateViewerAddressInput },
  { ViewerModel }: { ViewerModel: any }):
  Promise<ViewerTypeData | undefined> => {
  try {
    const { email, coords, addressGeo, } = input;

    const doc = await ViewerModel.findOneAndUpdate({ email }, { coords, addressGeo }, { new: true }).lean().exec();
    try {

      return doc
    } catch (error: any) {
      throw error
    }

  } catch (error: any) {
    throw error;
  }
}

const connectPayout = async (
  _: undefined,
  { input }: { input: ConnectPayoutInput },
  { stripe, ViewerModel, req, absoluteUrl }:
    {
      ViewerModel: any, absoluteUrl: (arg: any) => {},
      stripe: unknown, req: unknown, res: unknown
    }
): Promise<{ link: string } | undefined> => {
  try {
    const { id } = input

    const { origin } = absoluteUrl(req)
    const newOrganisator = await ViewerModel.findById(id).exec()
    if (!newOrganisator.strip_account_id) {
      let account
      try {

        account = await stripe.accounts.create({ type: 'express' });

        let accountLink = await stripe.accountLinks.create({
          account: account.id,
          refresh_url: `${origin}/collaborators/${id}`,
          return_url: `${origin}/collaborators/${id}`,
          type: 'account_onboarding',
        });
        accountLink = Object.assign(accountLink, {
          "stripe_user[email]": newOrganisator.email
        })

        await ViewerModel.findOneAndUpdate({ _id: id }, {
          stripe_account_id: account.id,
          stripe_link: accountLink['url']
        }, { new: true })

        return { link: accountLink['url'] }
      } catch (error: any) {
        throw error
      }

    }
  } catch (error: any) {
    throw error
  }
};


const stripeAccountStatus = async (
  _: undefined,
  { input }: { input: AccountStatusInput },
  { stripe, ViewerModel }:
    { ViewerModel: any, stripe: unknown }
): Promise<{ success: boolean, status: string } | undefined> => {
  try {
    const { accountId, email } = input
    const newOrganisator = await ViewerModel.findOne({ email }).exec()
    if (newOrganisator.strip_account_id) {
      try {

        const account = await stripe.accounts.retrieve(accountId);
        console.log(account)
        if (account && account.charges_enabled) {
          newOrganisator.hasWallet = true

          await newOrganisator.save()

          return { success: true, status: 'accouted' }
        } else {
          return { success: false, status: '' }
        }

      } catch (error: any) {
        throw error
      }
    } else {
      return { success: false, status: '' }
    }
  } catch (error: any) {
    throw error
  }
}


const payEnrollment = async (
  _: undefined,
  { input }: { input: EnrollmentInput },
  { ViewerModel }:
    { ViewerModel: any, }
): Promise<{ success: boolean, message: string } | undefined> => {

  const { title, profileEmail, collaboratorEmail, price, startDate, status, profileId,
    collaboratorId, endDate, flag, token, description } = input
  try {
    const doc = await ViewerModel.findOne({ email: collaboratorEmail }).exec()
    if (status === PROFILE_STATUS.COLL) {
      const collaboratorExists = doc.collaboratorProfiles.filter((profile: ConnexionProfileType) => profile['profileEmail'] === profileEmail)
      console.log({ collaboratorExists })

      if (collaboratorExists && collaboratorExists.length === 1 && collaboratorExists[0].token !== '') {
        const startD = new Date().toISOString()
        return {
          success: false, message: JSON.stringify({
            title, price, status, startDate: collaboratorExists.startDate ?
              collaboratorExists.startDate : startD, endDate: collaboratorExists.endDate,
            token: collaboratorExists.token, flag: collaboratorExists.flag, profileId: collaboratorExists.profileId,
            description: collaboratorExists.description, profileEmail: collaboratorExists.profileEmail
          })
        }
      } else if (collaboratorExists.length === 0) {
        doc.collaboratorProfiles = [...doc.collaboratorProfiles, {
          title, profileEmail, price, startDate, status, profileId,
          collaboratorId, endDate, flag, token, description
        }]
        await doc?.save();
        return {
          success: true, message: JSON.stringify({
            title, profileEmail, price, startDate, status, profileId,
            endDate, flag, token, description
          })
        }
      }
    } else if (status === PROFILE_STATUS.ORGA) {
      const organisatorExists = doc.organisatorProfiles.filter((profile: ConnexionProfileType) => profile['profileEmail'] === profileEmail)
      console.log({ organisatorExists })

      if (organisatorExists && organisatorExists.length === 1 && organisatorExists[0].token !== '') {
        const startD = new Date().toISOString()

        return {
          success: false, message: JSON.stringify({
            title, price, status, startDate: organisatorExists.startDate ?
              organisatorExists.startDate : startD, endDate: organisatorExists.endDate,
            token: organisatorExists.token, flag: organisatorExists.flag, profileId
          })
        }
      } else if (organisatorExists.length === 0) {

        doc.organisatorProfiles = [...doc.organisatorProfiles, {
          title, profileEmail, price, startDate, status, profileId,
          collaboratorId, endDate, flag, token, description
        }]
        await doc?.save();
        return {
          success: true, message: JSON.stringify({
            title, profileEmail, price, startDate, status, profileId,
            endDate, flag, token, description
          })
        }
      }

    } else if (status === PROFILE_STATUS.DISCOUNT) {
      const discountExists = doc.discountProfiles.filter((profile: ConnexionProfileType) => profile['profileEmail'] === profileEmail)
      console.log({ discountExists })

      if (discountExists && discountExists.length === 1 && discountExists[0].token !== '') {
        const startD = new Date().toISOString()

        return {
          success: false, message: JSON.stringify({
            title, price, status, startDate: discountExists.startDate ?
              discountExists.startDate : startD, endDate: discountExists.endDate,
            token: discountExists.token, flag: discountExists.flag, profileId
          })
        }
      } else if (discountExists.length === 0) {

        doc.discountProfiles = [...doc.discountProfiles, {
          title, profileEmail, price, startDate, status, profileId,
          collaboratorId, endDate, flag, token, description
        }]
        await doc?.save();
        return {
          success: true, message: JSON.stringify({
            title, profileEmail, price, startDate, status, profileId,
            endDate, flag, token, description
          })
        }
      }
    } else if (status === PROFILE_STATUS.LIBRARY) {
      const libraryExists = doc.libraryProfiles.filter((profile: ConnexionProfileType) => profile['profileEmail'] === profileEmail)
      console.log({ libraryExists })
      if (libraryExists && libraryExists.length === 1 && libraryExists[0].token !== '') {
        const startD = new Date().toISOString()
        return {
          success: false, message: JSON.stringify({
            title, price, status, startDate: libraryExists.startDate ?
              libraryExists.startDate : startD, endDate: libraryExists.endDate,
            token: libraryExists.token, flag: libraryExists.flag, profileId
          })
        }
      } else if (libraryExists.length === 0) {
        doc.libraryProfiles = [...doc.libraryProfiles, {
          title, profileEmail, price, startDate, status, profileId,
          endDate, flag, token, description
        }]
        await doc?.save();
        return {
          success: true, message: JSON.stringify({
            title, profileEmail, price, startDate, status, profileId,
            endDate, flag, token, description
          })
        }
      }
    } else if (status === PROFILE_STATUS.LIIS) {
      const liisExists = doc.liismanagerProfiles.filter((profile: ConnexionProfileType) => profile['profileEmail'] === profileEmail)
      console.log({ liisExists })
      if (liisExists && liisExists.length === 1 && liisExists[0].token !== '') {
        const startD = new Date().toISOString()
        return {
          success: false, message: JSON.stringify({
            title, price, status, startDate: liisExists.startDate ?
              liisExists.startDate : startD, endDate: liisExists.endDate,
            token: liisExists.token, flag: liisExists.flag, profileId
          })
        }
      } else if (liisExists.length === 0) {

        doc.liismanagerProfiles = [...doc.liismanagerProfiles, {
          title, profileEmail, price, startDate, status, profileId,
          endDate, flag, token, description
        }]
        await doc?.save();
        return {
          success: true, message: JSON.stringify({
            title, profileEmail, price, startDate, status, profileId,
            endDate, flag, token, description
          })
        }
      }
    } else if (status === PROFILE_STATUS.LIISMAIIL_GUEST) {
      const liismaiilExists = doc.liismaiilProfiles.filter((profile: ConnexionProfileType) => profile['profileEmail'] === profileEmail)
      if (liismaiilExists && liismaiilExists.length === 1 && liismaiilExists[0].token !== '') {
        const startD = new Date().toISOString()
        return {
          success: false, message: JSON.stringify({
            title, price, status, startDate: liismaiilExists.startDate ?
              liismaiilExists.startDate : startD, endDate: liismaiilExists.endDate,
            token: liismaiilExists.token, flag: liismaiilExists.flag, profileId
          })
        }
      } else if (liismaiilExists.length === 0) {

        doc.liismaiilProfiles = [...doc.liismaiilProfiles, {
          title, profileEmail, price, startDate, status, profileId,
          endDate, flag, token, description
        }]
        await doc?.save();
        return {
          success: true, message: JSON.stringify({
            title, profileEmail, price, startDate, status, profileId,
            endDate, flag, token, description
          })
        }
      }
    } else if (status === PROFILE_STATUS.GUEST) {
      const guestExists = doc.guestProfiles.filter((profile: ConnexionProfileType) => profile['profileEmail'] === profileEmail)
      if (guestExists && guestExists.length === 1 && guestExists[0].token !== '') {
        const startD = new Date().toISOString()
        return {
          success: false, message: JSON.stringify({
            title, price, status, startDate: guestExists.startDate ?
              guestExists.startDate : startD, endDate: guestExists.endDate,
            token: guestExists.token, flag: guestExists.flag, profileId
          })
        }
      } else if (guestExists.length === 0) {

        doc.guestProfiles = [...doc.guestProfiles, {
          title, profileEmail, price, startDate, status, profileId,
          endDate, flag, token, description
        }]
        await doc?.save();
        return {
          success: true, message: JSON.stringify({
            title, profileEmail, price, startDate, status, profileId,
            endDate, flag, token, description
          })
        }
      }
    }
    else if (status === PROFILE_STATUS.DELIVER) {
      const guestExists = doc.deliverProfiles.filter((profile: ConnexionProfileType) => profile['profileEmail']
        === profileEmail)
      if (guestExists && guestExists.length === 1 && guestExists[0].token !== '') {
        const startD = new Date().toISOString()
        return {
          success: false, message: JSON.stringify({
            title, price, status, startDate: guestExists.startDate ?
              guestExists.startDate : startD, endDate: guestExists.endDate,
            token: guestExists.token, flag: guestExists.flag, profileId
          })
        }
      } else if (guestExists.length === 0) {
        doc.deliverProfiles = [...doc.deliverProfiles, {
          title, profileEmail, price, startDate, status, profileId,
          endDate, flag, token, description
        }]
        await doc?.save();
        return {
          success: true, message: JSON.stringify({
            title, profileEmail, price, startDate, status, profileId,
            endDate, token, description
          })
        }
      } else {
        return { success: false, message: 'cant find the status' }
      }

    }
  }
  catch (error: any) {
    throw error
  }
};

/*const addEnrollment = async (
  _: undefined,
  { input }: { input: EnrollmentType },
  { ViewerModel, genRandomAffiliat }: { ViewerModel: any, genRandomAffiliat: () => { flag: string, token: string } }
): Promise<{ success: boolean, token: string, flag: string } | undefined> => {
  const {
    title,
    description,
    collaboratorEmail
    collaboratorId,
    profileEmail,
    price,
    token,
    flag,
    profileId,
    status,
    startDate,
    endDate, } = input
  try {
    const viewerDoc = await ViewerModel.findOne({ email: collaboratorEmail }).exec()

    switch (status) {
      case PROFILE_STATUS.COLL:
        try {

          if (viewerDoc && viewerDoc?.collaboratorProfiles && viewerDoc?.collaboratorProfiles?.length < 100) {
            const profileAffiliateExists = viewerDoc.collaboratorsProfiles.filter((profile: ConnexionProfileType) => profile['profileEmail'] === profileEmail)
            console.log({ profileAffiliateExists })

            if (profileAffiliateExists && profileAffiliateExists.length === 1 && profileAffiliateExists[0].token !== '') {
              return { success: false, token: profileAffiliateExists[0].token, flag: profileAffiliateExists[0].flag }
            } else if (profileAffiliateExists.length === 0) {
              if (viewerDoc.collaboratorProfiles && Array.isArray(viewerDoc.collaboratorProfiles) &&
                viewerDoc.collaboratorProfiles.length > 0) {
                viewerDoc.collaboratorProfiles = [...viewerDoc.collaboratorProfiles, {
                  title,
                  token,
                  profileEmail,
                  flag,
                  startDate,
                  endDate,
                  profileId,
                  status, price, description
                }]

                await viewerDoc?.save();
                return { success: true, token, flag }
              } else {
                viewerDoc.collaboratorProfiles = [{
                  title,
                  token,
                  profileEmail,
                  flag,
                  startDate,
                  endDate,
                  profileId,
                  status, price, description
                }]
                await viewerDoc?.save();
                return { success: true, token, flag }

              }
            }
          }
          else {
            return { success: false, token: '', flag: '' }
          }
        } catch (error) {
          throw (error)
        }

      case PROFILE_STATUS.LIIS:
        try {

          if (viewerDoc && viewerDoc.liismanagerProfiles && viewerDoc.liismanagerProfiles.length < 100) {
            const profileAffiliateExists = viewerDoc?.liismanagerProfiles.filter((profile: ConnexionProfileType) => profile['emailProfile'] === profileEmail)
            console.log({ profileAffiliateExists })

            if (profileAffiliateExists && profileAffiliateExists.length === 1 && profileAffiliateExists[0].token !== '') {
              return { success: false, token: profileAffiliateExists[0].token, flag: profileAffiliateExists[0].flag }
            } else if (profileAffiliateExists.length === 0) {
              if (viewerDoc.liismanagerProfiles && Array.isArray(viewerDoc.liismanagerProfiles) &&
                viewerDoc.liismanagerProfiles.length > 0) {
                viewerDoc.liismanagerProfiles = [...viewerDoc.liismanagerProfiles, {
                  title,
                  token,
                  profileEmail,
                  flag,
                  startDate,
                  endDate,
                  profileId,
                  status, price, description
                }]

                await viewerDoc?.save();
                return { success: true, token, flag }
              } else {
                viewerDoc.liismanagerProfiles = [{
                  title,
                  token,
                  profileEmail,
                  flag,
                  startDate,
                  endDate,
                  profileId,
                  status, price, description
                }]
                await viewerDoc?.save();
                return { success: true, token, flag }

              }
            }
          }
          else {
            return { success: false, token: '', flag: '' }
          }
        } catch (error) {
          throw (error)
        }
      case PROFILE_STATUS.ORGA:
        try {
          try {
            const organRef = await dbFirestore.collection('organisators').doc(profileId);
            const querySnapshot = await organRef.get()
            if (querySnapshot?.exists) {
              await organRef.set({
                title,
                token,
                profileEmail,
                flag,
                startDate,
                endDate,
                profileId,
                status, price, description
              })
            }
          } catch (error) {
            throw new Error(error)
          }
          if (viewerDoc && viewerDoc?.organisatorProfiles && viewerDoc?.organisatorProfiles.length < 100) {
            const profileAffiliateExists = viewerDoc.organisatorProfiles.filter((profile: ConnexionProfileType) => profile['profileEmail'] === profileEmail)
            console.log({ profileAffiliateExists })

            if (profileAffiliateExists && profileAffiliateExists.length === 1 && profileAffiliateExists[0].token !== '') {
              return { success: false, token: profileAffiliateExists[0].token, flag: profileAffiliateExists[0].flag }
            } else if (profileAffiliateExists.length === 0) {
              if (viewerDoc.organisatorProfiles && Array.isArray(viewerDoc.organisatorProfiles) &&
                viewerDoc.organisatorProfiles.length > 0) {
                viewerDoc.organisatorProfiles = [...viewerDoc.organisatorProfiles, {
                  title,
                  token,
                  profileEmail,
                  flag,
                  startDate,
                  endDate,
                  profileId,
                  status, price, description
                }]

                await viewerDoc?.save();
                return { success: true, token, flag }
              } else {
                viewerDoc.organisatorProfiles = [{
                  title,
                  token,
                  profileEmail,
                  flag,
                  startDate,
                  endDate,
                  profileId,
                  status, price, description
                }]
                await viewerDoc?.save();
                return { success: true, token, flag }

              }
            }
          }
          else {
            return { success: false, token: '', flag: '' }
          }
        } catch (error) {
          throw (error)
        }

      case PROFILE_STATUS.GUEST:
        try {

          if (viewerDoc && viewerDoc?.guestProfiles && viewerDoc?.guestProfiles.length < 100) {
            const profileAffiliateExists = viewerDoc?.guestProfiles?.filter((profile: ConnexionProfileType) => profile['emailProfile'] === profileEmail)
            console.log({ profileAffiliateExists })

            if (profileAffiliateExists && profileAffiliateExists.length === 1 && profileAffiliateExists[0].token !== '') {
              return { success: false, token: profileAffiliateExists[0].token, flag: profileAffiliateExists[0].flag }
            } else if (profileAffiliateExists.length === 0) {
              if (viewerDoc.guestProfiles && Array.isArray(viewerDoc.guestProfiles) &&
                viewerDoc.guestProfiles.length > 0) {
                viewerDoc.guestProfiles = [...viewerDoc.guestProfiles, {
                  title,
                  token,
                  profileEmail,
                  flag,
                  startDate,
                  endDate,
                  profileId,
                  status, price, description
                }]

                await viewerDoc?.save();
                return { success: true, token, flag }
              } else {
                viewerDoc.guestProfiles = [{
                  title,
                  token,
                  profileEmail,
                  flag,
                  startDate,
                  endDate,
                  profileId,
                  status, price, description
                }]
                await viewerDoc?.save();
                return { success: true, token, flag }

              }
            }
          }
          else {
            return { success: false, token: '', flag: '' }
          }
        } catch (error) {
          throw (error)
        }
      case PROFILE_STATUS.DELIVER:
        try {
          if (viewerDoc && viewerDoc.deliverProfiles && viewerDoc.deliverProfiles.length < 100) {
            const profileAffiliateExists = viewerDoc.deliverProfiles.filter((profile: ConnexionProfileType) => profile['emailProfile'] === profileEmail)
            console.log({ profileAffiliateExists })

            if (profileAffiliateExists && profileAffiliateExists.length === 1 && profileAffiliateExists[0].token !== '') {
              return { success: false, token: profileAffiliateExists[0].token, flag: profileAffiliateExists[0].flag }
            } else if (profileAffiliateExists.length === 0) {
              if (viewerDoc.deliverProfiles && Array.isArray(viewerDoc.deliverProfiles) &&
                viewerDoc.deliverProfiles.length > 0) {
                viewerDoc.deliverProfiles = [...viewerDoc.deliverProfiles, {
                  title,
                  token,
                  profileEmail,
                  flag,
                  startDate,
                  endDate,
                  profileId,
                  status, price, description
                }]

                await viewerDoc?.save();
                return { success: true, token, flag }
              } else {
                viewerDoc.deliverProfiles = [{
                  title,
                  token,
                  profileEmail,
                  flag,
                  startDate,
                  endDate,
                  profileId,
                  status, price, description
                }]
                await viewerDoc?.save();
                return { success: true, token, flag }
              }
            }
          }
          else {
            return { success: false, token: '', flag: '' }
          }
        } catch (error) {
          throw (error)
        }
    }
  } catch (error) {
    throw (error)
  }
};
 */
const updateEnrollment = async (
  _: undefined,
  { input }: { input: EnrollmentInput },
  { ViewerModel, slug }: { ViewerModel: any, slug: unknown }
): Promise<{ success: Array<EnrollmentType> } | undefined> => {
  try {
    console.log({ input })
    const { profileId, title, description, price, collaboratorId } = input

    const viewer = await ViewerModel.findOne({ _id: collaboratorId }).exec()
    if (viewer && viewer.enrollmentAll.length < 3) {
      const otherEnrol = viewer.enrollmentAll.filter((enrol: unknown) => slug(enrol.title) !== slug(title))
      if (otherEnrol.length > 0) {
        viewer.enrollmentAll = [...otherEnrol, { title, description, price, max, image }]
        await viewer.save()
        return { success: viewer.enrollmentAll }
      } else {
        viewer.enrollmentAll = [{ title, description, price, max, image }]
        await viewer.save()
        return { success: viewer.enrollmentAll }

      }
    } else {

      viewer.enrollmentAll.shift()
      viewer.enrollmentAll.push({ title, description, price, max, image })
      await viewer.save()
      return { success: viewer.enrollmentAll }
    }
  } catch (error: any) {

    throw error;
  }
};
const removeEnrollment = async (
  _: undefined,
  { input }: { input: RemoveEnrollmentInput },
  { ViewerModel, slug, dbFirestore }: { ViewerModel: any, slug: () => {}, dbFirestore: Firetore }
): Promise<{ success: boolean, message: string } | undefined> => {
  try {
    const { collaboratorEmail, profileId, token, status } = input
    console.log({ input })
    const viewer = await ViewerModel.findOne({ email: collaboratorEmail }).exec()
    if (viewer && viewer.enrollmentAll) {
      const otherEnrol: EnrollmentType[] = viewer.enrollmentAll.filter((enrol: EnrollmentType) => {
        return (enrol.token !== token || enrol.profileId !== profileId)
      })
      console.log({ viewer, enrollments: viewer.enrollmentAll })
      if (otherEnrol && Array.isArray(otherEnrol) &&
        otherEnrol?.length > 0) {
        viewer.enrollmentAll = otherEnrol
        await viewer.save()
        return { success: true, message: JSON.stringify(otherEnrol) }
      } else {
        viewer.enrollmentAll = null
        await viewer.save()
        return { success: true, message: 'No enrollments left ' }
      }
    } else {
      return { success: false, message: 'No viewer or enrollments with that token left ' }
    }
  } catch (error: FirestoreError | unknown) {
    return { success: false, message: JSON.stringify(error) }
      ;
  }
};
const getDiscountProducts = async (
  _: undefined,
  { input }: { input: GetDiscountInput },
  { ViewerModel, }: { ViewerModel: any, }
): Promise<{ discounted: DiscountProductType[] | null } | undefined> => {
  try {
    console.log({ input })
    const { affiliator, discountToken } = input

    const viewer = await ViewerModel.findOne({ email: affiliator }).exec()
    if (viewer && viewer.hundreddiscountpass.filter((discpass: { pass: string }) => discpass.pass === discountToken).length > 0) {
      const discounted = viewer.discountProducts.map((disc: unknown) => {
        const discountedTitle = viewer.products.filter((prod: string) => {
          prod === disc.title
        })
        if (discountedTitle.length > 0) {
          return { title: disc.title, stock: disc.stock }
        }
      })
      return { discounted }
    } else {
      return { discounted: null }
    }
  } catch (error: any) {

    throw error;
  }
};
const getQrCode = async (
  _: undefined,
  { url }: { url: string }): Promise<{ qrCodeUrl: string } | undefined> => {
  try {

    const qrCodeUrl = await QRCode.toDataURL(url)

    return {
      qrCodeUrl
    }
  } catch (error: any) {

    throw error;
  }
};
const validateProfileStatus = async (
  _: undefined,
  { id }: { id: string },
  { dbFirestore,
    timeStamp,
  }: { dbFirestore: unknown; timeStamp: unknown }
): Promise<{ success: boolean, message: string } | undefined> => {
  try {

    const updatedAt = timeStamp;
    const docRef = dbFirestore.collection('profiles').doc(`${id}`)
    return docRef.get()
      .then((snapshot: unknown) => {
        if (snapshot.exists) {
          return docRef.set(
            {
              valid: true,
              updatedAt
            },
            { merge: true }
          ).then(() => {

            return { success: true, message: snapshot.data().email }
          }).catch((error: any) => {
            throw new Error(error)

          });

        } else {
          return ({ success: false, email: '' })
        }
      })
      .catch((error: any) => {
        throw new Error(error)
      });

  } catch (error: any) {

    throw new Error(error);
  }
};



/* const uploadAvatar = async (
  _: undefined,
  { body }: { body: string },
  { cloudinary }: { cloudinary: unknown }
): Promise<{ url: string, public_id: string } | undefined> => {
 
  try {
    cloudinary!.uploader.upload(
      body, {
      public_id: `${Date.now()}`, // public name
      resource_type: 'auto',
      folder: 'lami1a/avatar'
    },
      function (error, result) {
        if (error) {
          throw error
        } else if (result) {
          return ({ url: result.secure_url, public_id: result.public_id })
        }
      }
 
    );
  } catch (error) {
    throw error
  }
}
 
const deleteAvatar = async (
  _: undefined,
  { imageId }: { imageId: string },
  { cloudinary }: { cloudinary: unknown }): Promise<{ success: boolean } | undefined> => {
 
 
  try {
 
    //console.log({ body: req.body });
    cloudinary!.uploader?.destroy(imageId, (error, result) => {
      if (error) {
        throw error;
      }
      return { success: true };
    });
  } catch (error) {
    throw error
  }
 
}
 
 */
const Viewer = {
  loginSlug: async (viewer: ViewerTypeData, _: undefined, { slug }: { slug: (arg: string) => string }): Promise<string | undefined> => {
    return slug(viewer.login)
  },

}
// eslint-disable-next-line no-undef
const viewerResolver = {
  DateTime: DateTimeResolver,
  Viewer,
  Query: {
    viewer,
    viewerById,
    viewers,
    enrollmentsByEmail,
    getGuestProfiles,
    getEvents,
    getLibraryProfiles,

  },
  Mutation: {
    notifySite,

  },
}

export default viewerResolver
