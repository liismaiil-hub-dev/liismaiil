// Themes
export const THEMES = {
  DEFAULT: "DEFAULT",
  DARK: "DARK",
  LIGHT: "LIGHT",
  BLUE: "BLUE",
  GREEN: "GREEN",
  INDIGO: "INDIGO",
};

export enum APP_ENV {
  BOX = "BOX",
  WEB = 'WEB',
  LOCAL = 'LOCAL',

}
// theme constant
export const gridSpacing = 1;
export const drawerWidth = 260;
export const appDrawerWidth = 320;
export const EVENT_STATUS = {
  LIIS: "LIIS",
  COLL: "COLL",
  ORGA: "ORGA",
  DELIVER: "DELIVER",
  OTHER: "OTHER",
  ADMIN: "ADMIN",
}
export const STATUS_COLOR = {
  GUEST: "primary",
  COLL: "warning",
  ORGA: "success",
  LIIS: "secondary",
  ADMIN: "error"
}
export const ROLES = {
  ADMIN: "ADMIN",
  LIIS: "liismanager",
  COLL: "collaborator",
  ORGA: "organisator",
  GUEST: "guest",
  USER: "user",
}
export const PRODUCT_STATUS = {
  ORGA: 'ORGA',
  FAMI: 'FAMI',
  FRONT: 'FRONT',
  LIIS: 'LIIS',
  VRAC: 'VRAC',
}
export const SECTIONS_SOURAS = {
  mofasal: [
    {
      souraName: "Adh-Dhaariyat",
      souraNb: 51
    },
    {
      souraName: "At-Tur",
      souraNb: 52
    },
    {
      souraName: "An-Najm",
      souraNb: 53
    },
    {
      souraName: "Al-Qamar",
      souraNb: 54
    },
    {
      souraName: "Ar-Rahmaan",
      souraNb: 55
    },
    {
      souraName: "Al-Waaqia",
      souraNb: 56
    },
    {
      souraName: "Al-Hadid",
      souraNb: 57
    },
    {
      souraName: "Al-Mujaadila",
      souraNb: 58
    },
    {
      souraName: "Al-Hashr",
      souraNb: 59
    },
    {
      souraName: "Al-Mumtahana",
      souraNb: 60
    },
    {
      souraName: "As-Saff",
      souraNb: 61
    },
    {
      souraName: "Al-Jumu'a",
      souraNb: 62
    },
    {
      souraName: "Al-Munaafiqoon",
      souraNb: 63
    },
    {
      souraName: "At-Taghaabun",
      souraNb: 64
    },
    {
      souraName: "At-Talaaq",
      souraNb: 65
    },
    {
      souraName: "At-Tahrim",
      souraNb: 66
    },
    {
      souraName: "Al-Mulk",
      souraNb: 67
    },
    {
      souraName: "Al-Qalam",
      souraNb: 68
    },
    {
      souraName: "Al-Haaqqa",
      souraNb: 69
    },
    {
      souraName: "Al-Ma'aarij",
      souraNb: 70
    },
    {
      souraName: "Nooh",
      souraNb: 71
    },
    {
      souraName: "Al-Jinn",
      souraNb: 72
    },
    {
      souraName: "Al-Muzzammil",
      souraNb: 73
    },
    {
      souraName: "Al-Muddaththir",
      souraNb: 74
    },
    {
      souraName: "Al-Qiyaama",
      souraNb: 75
    },
    {
      souraName: "Al-Insaan",
      souraNb: 76
    },
    {
      souraName: "Al-Mursalaat",
      souraNb: 77
    },
    {
      souraName: "An-Naba",
      souraNb: 78
    },
    {
      souraName: "An-Naazi'aat",
      souraNb: 79
    },
    {
      souraName: "Abasa",
      souraNb: 80
    },
    {
      souraName: "At-Takwir",
      souraNb: 81
    },
    {
      souraName: "Al-Infitaar",
      souraNb: 82
    },
    {
      souraName: "Al-Mutaffifin",
      souraNb: 83
    },
    {
      souraName: "Al-Inshiqaaq",
      souraNb: 84
    },
    {
      souraName: "Al-Burooj",
      souraNb: 85
    },
    {
      souraName: "At-Taariq",
      souraNb: 86
    },
    {
      souraName: "Al-A'laa",
      souraNb: 87
    },
    {
      souraName: "Al-Ghaashiya",
      souraNb: 88
    },
    {
      souraName: "Al-Fajr",
      souraNb: 89
    },
    {
      souraName: "Al-Balad",
      souraNb: 90
    },
    {
      souraName: "Ash-Shams",
      souraNb: 91
    },
    {
      souraName: "Al-Lail",
      souraNb: 92
    },
    {
      souraName: "Ad-Dhuhaa",
      souraNb: 93
    },
    {
      souraName: "Ash-Sharh",
      souraNb: 94
    },
    {
      souraName: "At-Tin",
      souraNb: 95
    },
    {
      souraName: "Al-Alaq",
      souraNb: 96
    },
    {
      souraName: "Al-Qadr",
      souraNb: 97
    },
    {
      souraName: "Al-Bayyina",
      souraNb: 98
    },
    {
      souraName: "Az-Zalzala",
      souraNb: 99
    },
    {
      souraName: "Al-Aadiyaat",
      souraNb: 100
    },
    {
      souraName: "Al-Qaari'a",
      souraNb: 101
    },
    {
      souraName: "At-Takaathur",
      souraNb: 102
    },
    {
      souraName: "Al-Asr",
      souraNb: 103
    },
    {
      souraName: "Al-Humaza",
      souraNb: 104
    },
    {
      souraName: "Al-Fil",
      souraNb: 105
    },
    {
      souraName: "Quraish",
      souraNb: 106
    },
    {
      souraName: "Al-Maa'un",
      souraNb: 107
    },
    {
      souraName: "Al-Kawthar",
      souraNb: 108
    },
    {
      souraName: "Al-Kaafiroon",
      souraNb: 109
    },
    {
      souraName: "An-Nasr",
      souraNb: 110
    },
    {
      souraName: "Al-Masad",
      souraNb: 111
    },
    {
      souraName: "Al-Ikhlaas",
      souraNb: 112
    },
    {
      souraName: "Al-Falaq",
      souraNb: 113
    },
    {
      souraName: "An-Naas",
      souraNb: 114
    }
  ],
  mathani: [
    {
      souraName: "Maryam",
      souraNb: 19
    },
    {
      souraName: "Taa-Haa",
      souraNb: 20
    },
    {
      souraName: "Al-Anbiyaa",
      souraNb: 21
    },
    {
      souraName: "Al-Hajj",
      souraNb: 22
    },
    {
      souraName: "Al-Muminoon",
      souraNb: 23
    },
    {
      souraName: "An-Noor",
      souraNb: 24
    },
    {
      souraName: "Al-Furqaan",
      souraNb: 25
    },
    {
      souraName: "Ash-Shu'araa",
      souraNb: 26
    },
    {
      souraName: "An-Naml",
      souraNb: 27
    },
    {
      souraName: "Al-Qasas",
      souraNb: 28
    },
    {
      souraName: "Al-Ankaboot",
      souraNb: 29
    },
    {
      souraName: "Ar-Room",
      souraNb: 30
    },
    {
      souraName: "Luqman",
      souraNb: 31
    },
    {
      souraName: "As-Sajda",
      souraNb: 32
    },
    {
      souraName: "Al-Ahzaab",
      souraNb: 33
    },
    {
      souraName: "Saba",
      souraNb: 34
    },
    {
      souraName: "Faatir",
      souraNb: 35
    },
    {
      souraName: "Yaseen",
      souraNb: 36
    },
    {
      souraName: "As-Saaffaat",
      souraNb: 37
    },
    {
      souraName: "Saad",
      souraNb: 38
    },
    {
      souraName: "Az-Zumar",
      souraNb: 39
    },
    {
      souraName: "Ghafir",
      souraNb: 40
    },
    {
      souraName: "Fussilat",
      souraNb: 41
    },
    {
      souraName: "Ash-Shura",
      souraNb: 42
    },
    {
      souraName: "Az-Zukhruf",
      souraNb: 43
    },
    {
      souraName: "Ad-Dukhaan",
      souraNb: 44
    },
    {
      souraName: "Al-Jaathiya",
      souraNb: 45
    },
    {
      souraName: "Al-Ahqaf",
      souraNb: 46
    },
    {
      souraName: "Muhammad",
      souraNb: 47
    },
    {
      souraName: "Al-Fath",
      souraNb: 48
    },
    {
      souraName: "Al-Hujuraat",
      souraNb: 49
    },
    {
      souraName: "Qaaf",
      souraNb: 50
    }
  ],
  miin: [
    {
      souraName: "Al-Anfaal",
      souraNb: 8
    },
    {
      souraName: "At-Tawba",
      souraNb: 9
    },
    {
      souraName: "Yunus",
      souraNb: 10
    },
    {
      souraName: "Hud",
      souraNb: 11
    },
    {
      souraName: "Yusuf",
      souraNb: 12
    },
    {
      souraName: "Ar-Ra'd",
      souraNb: 13
    },
    {
      souraName: "Ibrahim",
      souraNb: 14
    },
    {
      souraName: "Al-Hijr",
      souraNb: 15
    },
    {
      souraName: "An-Nahl",
      souraNb: 16
    },
    {
      souraName: "Al-Israa",
      souraNb: 17
    },
    {
      souraName: "Al-Kahf",
      souraNb: 18
    }
  ],
  tiwal: [
    {
      souraName: "Al-Faatiha",
      souraNb: 1
    },
    {
      souraName: "Al-Baqara",
      souraNb: 2
    },
    {
      souraName: "Aal-i-Imraan",
      souraNb: 3
    },
    {
      souraName: "An-Nisaa",
      souraNb: 4
    },
    {
      souraName: "Al-Maaida",
      souraNb: 5
    },
    {
      souraName: "Al-An'aam",
      souraNb: 6
    },
    {
      souraName: "Al-A'raaf",
      souraNb: 7
    }
  ]
}
