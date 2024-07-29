import { bindActionCreators } from '@reduxjs/toolkit'
import {useDispatch} from 'react-redux'
import { cartAction } from 'src/store/slices/cart.slice'
import { userAction } from 'src/store/slices/user.slice'

import { AppDispatch } from 'src/store/store'


const actions = {
  ...cartAction,
  ...userAction,
}

export const useAppDispatch = () => {
  const dispatch = useDispatch()
  return bindActionCreators(actions, dispatch)
}

export const useAsyncDispatch = () => useDispatch<AppDispatch>()
