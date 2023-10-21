<FormLabel>{el.label}</FormLabel>
						<FormInput
							type={el.type}
							placeholder={`Enter your ${el.label.toLocaleLowerCase()}`}
							value={el.value}
							onChange={el.onChange}
						/>