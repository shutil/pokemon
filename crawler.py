from requests_html import HTMLSession
import json
session = HTMLSession()

def names():
    r = session.get("https://pokemondb.net/pokedex/national")
    name = r.html.find(".ent-name")
    name_list = []
    for x in range(0,len(name)):
        pokemon_name = name[x].attrs["href"]
        name_list.append(pokemon_name.split("/")[2]);
    return name_list


def large_links():
    lst = names()
    src = []
    for y in range(0,len(lst)):
        r_new = session.get("https://pokemondb.net/pokedex/"+lst[y])
        img_src = r_new.html.find("img")
        new_src = img_src[0].attrs["src"].split("/")
        new_src.insert(4,"large")
        src.append("/".join(new_src))
        print(str(y)+") "+"/".join(new_src))
    return src



print(f"Total number of pokemon {len(names())}")
print(large_links())
data = {"names":names(),"links":large_links()}

dp = json.dumps(data,indent=1)

f = open("data.json","w")
f.write(dp)
f.close()