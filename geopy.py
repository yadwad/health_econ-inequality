from geopy.geocoders import Nominatim
geolocator = Nominatim(user_agent="my-application")
geolocator.geocode({"postalcode": 10117})
# print(location.raw)
print((location.latitude, location.longitude))