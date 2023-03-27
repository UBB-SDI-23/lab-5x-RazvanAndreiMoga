


class UserDto:

    def __init__(self, user_id, username, password, email, first_name, last_name, is_active, is_admin):

        self.user_id = user_id

        self.username = username

        self.password = password

        self.email = email

        self.first_name = first_name

        self.last_name = last_name

        self.is_active = is_active

        self.is_admin = is_admin

    def __str__(self):
        return f"{self.user_id} - {self.username} - {self.password} - {self.email} - {self.first_name} - {self.last_name} - {self.is_active} - {self.is_admin}"
