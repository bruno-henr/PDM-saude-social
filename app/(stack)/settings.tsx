import SettingButton from '@/components/settings/SettingButton';
import { useAuth } from '@/context/AuthContext';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Button, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


const Settings: React.FC = () => {
  const { user, logout } = useAuth();
  return (
    <View style={style.container}>
      <View>

        <View style={style.header}>
          <Text style={style.textHeader}>{user.nome}</Text>
        </View>
        <View>
          <SettingButton routerName='account' title='Conta' />
          <SettingButton routerName='privacy' title='Privacidade' />
          <SettingButton routerName='aboutUs' title='Sobre nós' />
        </View>
      </View>

      <View style={style.center}>
        <TouchableOpacity onPress={logout}>
          <View style={style.btnLoggout}>
            <Feather size={30} name='log-out' color={'#fff'} />
            <Text style={style.textLoggout}>Sair</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 200
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#E7ECF0'
  },
  header: {
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  textHeader: {
    color: '#687684',
    fontWeight: 'bold',
  },
  btnLoggout: {
    backgroundColor: 'red',
    width: 140,
    height: 80,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  textLoggout: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
})

export default Settings;