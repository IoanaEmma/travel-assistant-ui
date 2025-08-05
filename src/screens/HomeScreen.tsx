import { View, Text, StyleSheet, TextInput, ActivityIndicator, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { useChatWithAssistantMutation } from '../features/travel/travelApi';
import { RootState } from "../store";
import { useState } from 'react';
import { useRouter } from 'expo-router';

interface ChatMessage {
	id: string;
	text: string;
	isUser: boolean;
	timestamp: Date;
}

export default function Home() {
	const [chatWithAssistant, { isLoading }] = useChatWithAssistantMutation();
	const [userMessage, setUserMessage] = useState('');
	const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
	const [hasAssistantResponse, setHasAssistantResponse] = useState(false);
	const router = useRouter();

	const handleChat = async () => {
		if (!userMessage.trim()) return;

		const userMsg: ChatMessage = {
			id: Date.now().toString(),
			text: userMessage,
			isUser: true,
			timestamp: new Date()
		};

		// Add user message to chat
		setChatMessages(prev => [...prev, userMsg]);
		const currentMessage = userMessage;
		setUserMessage(''); // Clear input

		try {
			const response = await chatWithAssistant(currentMessage).unwrap();
			console.log('Assistant response:', response);
			// Add assistant response to chat if there's a response string
			if (typeof response.response === 'string') {
				console.log('assistantResponse:', response.response);
				const assistantMsg: ChatMessage = {
					id: (Date.now() + 1).toString(),
					text: response.response,
					isUser: false,
					timestamp: new Date()
				};
				setChatMessages(prev => [...prev, assistantMsg]);
			}

			// Navigate to appropriate tab if specified
			if (response.tab !== 'home') {
				router.push(`/${response.tab}`);
			}

			console.log('Chat messages:', chatMessages);
		} catch (error) {
			// Add error message to chat
			setHasAssistantResponse(true);
			const errorMsg: ChatMessage = {
				id: (Date.now() + 1).toString(),
				text: "I'm not really in the mood to talk right now. Let's try again later.",
				isUser: false,
				timestamp: new Date()
			};
			setChatMessages(prev => [...prev, errorMsg]);
		}
	};

	const renderMessage = (message: ChatMessage) => {
		return (
			<View
				key={message.id}
				style={[
					styles.messageContainer,
					message.isUser ? styles.userMessage : styles.assistantMessage
				]}
			>
				<View
					style={[
						styles.messageBubble,
						message.isUser ? styles.userBubble : styles.assistantBubble
					]}
				>
					<Text
						style={[
							styles.messageText,
							message.isUser ? styles.userText : styles.assistantText
						]}
					>
						{message.text}
					</Text>
				</View>
				<Text style={styles.timestamp}>
					{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
				</Text>
			</View>
		);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Welcome to Smart Travel Assistant</Text>
			<Text style={styles.subtitle}>Your AI-powered travel companion</Text>

			<View style={styles.inputContainer}>
				<TextInput
					value={userMessage}
					onChangeText={setUserMessage}
					onSubmitEditing={handleChat}
					returnKeyType="send"
					style={[
						styles.input,
						hasAssistantResponse && styles.inputDisabled
					]}
					placeholder="Hi there, let me help you plan your next trip..."
					placeholderTextColor="#888"
					editable={!isLoading && !hasAssistantResponse}
				/>
			</View>

			{/* Chat Messages */}
			{chatMessages.length > 0 && (
				<ScrollView
					style={styles.chatContainer}
					contentContainerStyle={styles.chatContent}
					showsVerticalScrollIndicator={false}
				>
					{chatMessages.map(renderMessage)}

					{/* Loading indicator for assistant response */}
					{isLoading && (
						<View style={[styles.messageContainer, styles.assistantMessage]}>
							<View style={[styles.messageBubble, styles.assistantBubble]}>
								<ActivityIndicator size="small" color="#1976d2" />
								<Text style={[styles.messageText, styles.assistantText, { marginLeft: 8 }]}>
									Thinking...
								</Text>
							</View>
						</View>
					)}
				</ScrollView>
			)}

			{/* Loading indicator when no chat history */}
			{isLoading && chatMessages.length === 0 && (
				<ActivityIndicator size="large" color="#1976d2" style={{ marginTop: 16 }} />
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
		backgroundColor: '#f0f4f8',
		paddingTop: 60,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 8,
	},
	subtitle: {
		fontSize: 16,
		color: '#555',
		marginBottom: 24,
	},
	inputContainer: {
		width: '100%',
		alignItems: 'center',
		marginBottom: 16,
	},
	input: {
		width: '90%',
		height: 44,
		backgroundColor: '#fff',
		borderRadius: 22,
		paddingHorizontal: 20,
		fontSize: 16,
		borderWidth: 1,
		borderColor: '#ddd',
		elevation: 2,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.08,
		shadowRadius: 2,
	},
	inputDisabled: {
		backgroundColor: '#f5f5f5',
		borderColor: '#ccc',
		color: '#999',
		opacity: 0.6,
	},
	chatContainer: {
		flex: 1,
		width: '100%',
		maxHeight: 400,
	},
	chatContent: {
		paddingHorizontal: 10,
	},
	messageContainer: {
		marginVertical: 4,
		maxWidth: '80%',
	},
	userMessage: {
		alignSelf: 'flex-end',
		alignItems: 'flex-end',
	},
	assistantMessage: {
		alignSelf: 'flex-start',
		alignItems: 'flex-start',
	},
	messageBubble: {
		paddingHorizontal: 16,
		paddingVertical: 10,
		borderRadius: 18,
		marginBottom: 4,
		maxWidth: '100%',
	},
	userBubble: {
		backgroundColor: '#1976d2',
		borderBottomRightRadius: 4,
	},
	assistantBubble: {
		backgroundColor: '#fff',
		borderBottomLeftRadius: 4,
		borderWidth: 1,
		borderColor: '#e0e0e0',
	},
	messageText: {
		fontSize: 16,
		lineHeight: 20,
	},
	userText: {
		color: '#fff',
	},
	assistantText: {
		color: '#333',
	},
	timestamp: {
		fontSize: 12,
		color: '#888',
		marginHorizontal: 8,
	},
});