import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Pressable } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';

export const CustomAlertModal: React.FC = () => {
  const { alertModal, hideAlertModal, theme, user } = useApp();

  if (!alertModal.visible) return null;

  const isSuccess = alertModal.type === 'success' || !alertModal.type;
  const isWarning = alertModal.type === 'warning';

  return (
    <Modal
      transparent
      animationType="fade"
      visible={alertModal.visible}
      onRequestClose={hideAlertModal}
    >
      <Pressable style={styles.backdrop} onPress={hideAlertModal}>
        <Pressable
          style={[
            styles.card,
            { backgroundColor: theme.cardWhite, borderColor: theme.mintBorder },
          ]}
          onPress={(e) => e.stopPropagation()}
        >
          {/* Header Icon */}
          <View
            style={[
              styles.iconWrapper,
              {
                backgroundColor: isWarning
                  ? '#FFEAEA'
                  : isSuccess
                  ? '#EEF2FF'
                  : '#E6F2FF',
              },
            ]}
          >
            {isWarning ? (
              <Ionicons name="trash-outline" size={32} color="#FF5757" />
            ) : isSuccess ? (
              <Ionicons name="checkmark-circle-outline" size={34} color={theme.primary} />
            ) : (
              <Ionicons name="information-circle-outline" size={34} color="#3299FF" />
            )}
          </View>

          {/* User Tag */}
          <View style={styles.userTag}>
            <MaterialCommunityIcons name="account-check" size={14} color={theme.primary} />
            <Text style={styles.userTagText}>Personalized for {user.name}</Text>
          </View>

          {/* Title */}
          <Text style={[styles.title, { color: theme.textPrimary }]}>
            {alertModal.title}
          </Text>

          {/* Message */}
          <Text style={[styles.message, { color: theme.textSecondary }]}>
            {alertModal.message}
          </Text>

          {/* Action Button */}
          <TouchableOpacity
            style={[styles.confirmButton, { backgroundColor: theme.primary }]}
            onPress={hideAlertModal}
            activeOpacity={0.8}
          >
            <Text style={styles.confirmButtonText}>Got It, Thanks!</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(9, 42, 42, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 340,
    borderRadius: 28,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  iconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  userTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    gap: 6,
    marginBottom: 10,
  },
  userTagText: {
    color: '#0F172A',
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  confirmButton: {
    width: '100%',
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00D09E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});

