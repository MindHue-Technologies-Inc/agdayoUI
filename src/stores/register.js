import { atom } from 'nanostores';

export const useRegisterStore = atom({
  register: false,
  email: '',
  password: '',
  homeProvince: '',
  hasExperience: false,
  spentVacations: [],
  heardUs: '',
});

export function setEmail(email) {
  useRegisterStore.set({
    ...useRegisterStore.get(),
    email: email,
  })
}

export function setPassword(password) {
  useRegisterStore.set({
    ...useRegisterStore.get(),
    password: password,
  })
}

export function setHomeProvince(homeProvince) {
  useRegisterStore.set({
    ...useRegisterStore.get(),
    homeProvince: homeProvince,
  })
}

export function setSpentVacation(spentVacation) {
  useRegisterStore.set({
    ...useRegisterStore.get(),
    spentVacation: spentVacation,
  })
}

export function setHeardUs(heardUs) {
  useRegisterStore.set({
    ...useRegisterStore.get(),
    heardUs: heardUs,
  })
}

export function setHasExperience(hasExperience) {
  useRegisterStore.set({
    ...useRegisterStore.get(),
    hasExperience: hasExperience,
  })
}